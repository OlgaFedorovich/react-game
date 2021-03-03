const playingModesObj = {
    title: "Choose playing mode",
    options: [
        {
            label: "Play alone",
            value: "alone",
            name: "mode",

        },
        {
            label: "Play with computer",
            value: "computer",
            name: "mode",

        },
        {
            label: "Autoplay",
            value: "autoplay",
            name: "mode",
        }
    ]
};

const levelsObj = {
    title: "Choose level",
    options: [
        {
            label: "Easy (3 x 3)",
            value: 3,
            name: "level",

        },
        {
            label: "Medium (4 x 4)",
            value: 4,
            name: "level",

        },
        {
            label: "Difficult (5 x 5)",
            value: 5,
            name: "level",
        }
    ]
};

const firstMoveObj = {
    title: "You want to make first move",
    options: [
        {
            label: "Yes",
            value: "true",
            name: "first-move"

        },
        {
            label: "No",
            value: "false",
            name: "first-move"
        }
    ]
};

const playersRoles = {
    X: {
        'classic': 'Cross',
        'react-angular': 'React',
        'sun-moon': "Moon",
        'fruits-veggies': 'Fruit',
        'tom-djerry': 'Tom',
        'djoker-batman': 'Batman',
        'winter-summer': 'Winter'
    },
    O: {
        'classic': 'Zero',
        'react-angular': 'Angular',
        'sun-moon': "Sun",
        'fruits-veggies': 'Veggie',
        'tom-djerry': 'Jerry',
        'djoker-batman': 'Joker',
        'winter-summer': 'Summer'
    }
}

export {playingModesObj, levelsObj, firstMoveObj, playersRoles};