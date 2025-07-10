import React from 'react';
import Header from './components/Header';
import AddUser from './components/AddUser';
import GeneratePlan from './components/GeneratePlan';
import ViewPlans from './components/ViewPlans';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <Header />
      <AddUser />
      <hr />
      <GeneratePlan />
      <hr />
      <ViewPlans />
      <Footer />
    </div>
  );
}

export default App;
