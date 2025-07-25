import firebase_admin
from firebase_admin import credentials, firestore
from flask import request, jsonify
from flask_cors import CORS
from firebase_admin import firestore
from dotenv import load_dotenv
import os

load_dotenv()  # take environment variables from .env.

JWT_SECRET = os.getenv('JWT_SECRET')



# Existing Flask imports
from flask import Flask

app = Flask(__name__)

# Firebase initialization
cred = credentials.Certificate('serviceAccountKey.json')
firebase_admin.initialize_app(cred)
db = firestore.client()

@app.route('/')
def home():
    return "Welcome to AI Revision Platform!"

@app.route('/testfirebase')
def test_firebase():
    users_ref = db.collection(u'Users')
    users_ref.add({
        u'name': u'Test User',
        u'email': u'test@example.com'
    })
    return "Test user added to Firestore!"

@app.route('/adduser', methods=['POST'])
def add_user():
    data = request.get_json()

    if not data:
        return jsonify({"error": "No data provided"}), 400

    name = data.get('name')
    email = data.get('email')
    subjects = data.get('subjects')  # Expecting a list of subjects and topics

    if not name or not email or not subjects:
        return jsonify({"error": "Missing name, email or subjects"}), 400

    try:
        users_ref = db.collection('Users')
        users_ref.add({
            'name': name,
            'email': email,
            'subjects': subjects
        })
        return jsonify({"message": "User added successfully!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/getuser/<email>', methods=['GET'])
def get_user(email):
    try:
        users_ref = db.collection('Users')
        query = users_ref.where('email', '==', email).stream()

        user_data = []
        for doc in query:
            data = doc.to_dict()
            data['id'] = doc.id
            user_data.append(data)

        if not user_data:
            return jsonify({"message": "User not found"}), 404

        return jsonify({"user": user_data}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/generateplan', methods=['POST'])
def generate_plan():
    data = request.get_json()
    email = data.get('email')
    days = data.get('days')

    if not email or not days:
        return jsonify({"error": "Missing email or days"}), 400

    try:
        # Fetch user data
        users_ref = db.collection('Users')
        query = users_ref.where('email', '==', email).stream()
        user_doc = None
        for doc in query:
            user_doc = doc.to_dict()
            break

        if not user_doc:
            return jsonify({"error": "User not found"}), 404

        # Extract topics
        all_topics = []
        for subject in user_doc['subjects']:
            for topic in subject['topics']:
                all_topics.append({
                    "subject": subject['subject_name'],
                    "topic": topic
                })

        # Generate plan
        plan = []
        topics_per_day = len(all_topics) // days
        remainder = len(all_topics) % days

        index = 0
        for i in range(days):
            num_topics = topics_per_day + (1 if i < remainder else 0)
            day_topics = all_topics[index:index + num_topics]
            plan.append({
                "day": i + 1,
                "topics": day_topics
            })
            index += num_topics

        # Save to RevisionPlans collection
        plans_ref = db.collection('RevisionPlans')
        plans_ref.add({
            'email': email,
            'generated_on': firestore.SERVER_TIMESTAMP,
            'plan_details': plan
        })

        return jsonify({"message": "Revision plan generated successfully!", "plan": plan}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

CORS(app, origins=["https://ai-revision-platform-git-master-phoenix1454s-projects.vercel.app"])

@app.route('/getplans/<email>', methods=['GET'])
def get_plans(email):
    try:
        plans_ref = db.collection('RevisionPlans')
        query = plans_ref.where('email', '==', email).stream()

        plans = []
        for doc in query:
            data = doc.to_dict()
            data['id'] = doc.id
            plans.append(data)

        if not plans:
            return jsonify({"message": "No plans found for this user"}), 404

        return jsonify({"plans": plans}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    import os
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)



