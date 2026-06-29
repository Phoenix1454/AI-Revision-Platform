import pytest

from ml import distribute_topics


def test_splits_evenly_when_divisible():
    topics = [f"t{i}" for i in range(6)]
    plan = distribute_topics(topics, 3)
    assert [len(day["topics"]) for day in plan] == [2, 2, 2]


def test_front_loads_remainder():
    topics = [f"t{i}" for i in range(7)]
    plan = distribute_topics(topics, 3)
    assert [len(day["topics"]) for day in plan] == [3, 2, 2]


def test_every_topic_is_used_exactly_once():
    topics = [f"t{i}" for i in range(10)]
    plan = distribute_topics(topics, 4)
    seen = [t for day in plan for t in day["topics"]]
    assert seen == topics


def test_more_days_than_topics_gives_empty_days():
    topics = ["t0", "t1"]
    plan = distribute_topics(topics, 5)
    assert [len(day["topics"]) for day in plan] == [1, 1, 0, 0, 0]


def test_zero_days_raises():
    with pytest.raises(ValueError):
        distribute_topics(["t0"], 0)
