//Database for all enumerable items
const mine51 = Object.freeze([
    [
        {
            "type": ["Mine_Room_Small"],
            "tag": "begin",
            "chance": 1,
            "branchWeight": 1
        },
        {
            "type": ["Mine_Room_Small", "Mine_Room_Large"],
            "tag": "normal_encounters",
            "chance": 1,
            "branchWeight": 4
        },
        {
            "type": ["Mine_Room_Large"],
            "tag": "normal_encounters",
            "chance": 1,
            "branchWeight": 4
        },
        {
            "type": ["Mine_Room_Small", "Mine_Room_Large"],
            "tag": "normal_encounters",
            "chance": 1,
            "branchWeight": 4
        },
        {
            "type": ["Mine_Room_Large"],
            "tag": "normal_encounters",
            "chance": 1,
            "branchWeight": 4
        },
        {
            "type": ["Mine_Room_Small"],
            "tag": "end",
            "chance": 1,
            "branchWeight": 1
        }
    ],
    [
        {
            "type": ["Mine_Room_Small"],
            "tag": "relic_encounters_unlocked",
            "chance": 1,
            "branchWeight": 1
        }
    ],
    [
        {
            "type": ["Mine_Room_Small"],
            "tag": "black_rabbit_first",
            "chance": 1,
            "branchWeight": 1,
        }
    ],
    [
        {
            "type": ["Mine_Room_Small", "Mine_Room_Large"],
            "tag": "treasure_encounters",
            "chance": 1,
            "branchWeight": 1
        }
    ],
    [
        {
            "type": ["Mine_Room_Small", "Mine_Room_Large"],
            "tag": "treasure_encounters",
            "chance": 0.5,
            "branchWeight": 0,
            "requirements": "adventurers_whip > 0",
            "skip":true
        }
    ],
    [
        {
            "type": ["Mine_Room_Small"],
            "tag": "altar",
            "chance": 1,
            "branchWeight": 1
        }
    ],
    [
        {
            "type": ["Mine_Room_Small", "Mine_Room_Small"],
            "tag": "secret",
            "chance": 1,
            "branchWeight": 1
        }
    ],
    [
        {
            "type": ["Mine_Room_Small", "Mine_Room_Large"],
            "tag": "secret",
            "chance": 1,
            "branchWeight": 1
        }
    ],
    [
        {
            "type": ["Mine_Room_Small", "Mine_Room_Large"],
            "tag": "secret",
            "chance": 0.5,
            "branchWeight": 1,
            "requirements": "adventurers_hat > 0",
            "skip":true
        }
    ],
    [
        {
            "type": ["SleepyHoodyRoom"],
            "tag": "hoody",
            "chance": 1,
            "branchWeight": 1
        }
    ],
    [
        {
            "type": ["Mine_Room_Small", "Mine_Room_Large"],
            "tag": "hidden",
            "chance": 1,
            "branchWeight": 1
        }
    ],
    [
        {
            "type": ["Mine_Room_Large"],
            "tag": "relic_altar",
            "chance": 0.0625,
            "branchWeight": 0
        }
    ],
    [
        {
            "type": ["Mine_Room_Small"],
            "tag": "tribute_fountain",
            "chance": 0.0625,
            "branchWeight": 0
        }
    ]
]);



