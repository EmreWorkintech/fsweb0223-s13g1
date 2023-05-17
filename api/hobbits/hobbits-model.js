let id = 0;

function getId() {
    return ++id;
}

let hobbits = [
    {
        id: getId(),
        name: "Sam"
    },
    {
        id: getId(),
        name: "Merry"
    },
    {
        id: getId(),
        name: "Gandalf"
    },
    {
        id: getId(),
        name: "Sauron"
    },

    {
        id: getId(),
        name: "Elrond"
    },

    {
        id: getId(),
        name: "Balin"
    },
    {
        id: getId(),
        name: "Thorin"
    },
]

module.exports = {
    hobbits,
    getId,
};