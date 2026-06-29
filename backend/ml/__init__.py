def distribute_topics(all_topics, days):
    """Split topics evenly across the given number of days.

    Earlier days get the extra topic when the count doesn't divide evenly,
    e.g. 7 topics over 3 days -> [3, 2, 2].
    """
    if days <= 0:
        raise ValueError("days must be a positive integer")

    topics_per_day = len(all_topics) // days
    remainder = len(all_topics) % days

    plan = []
    index = 0
    for i in range(days):
        num_topics = topics_per_day + (1 if i < remainder else 0)
        day_topics = all_topics[index:index + num_topics]
        plan.append({
            "day": i + 1,
            "topics": day_topics
        })
        index += num_topics

    return plan
