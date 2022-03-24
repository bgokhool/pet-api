const { v4: uuidv4 } = require('uuid');
let pets = require('../pets');

const categories = { 'Dogs': '1', 'Cats': '2' };

// function getCategoryID(name) {
//     return categories[name];
// }

const getPets = (req, res) => {
    res.send(pets);
}

const getPet = (req, res) => {
    const { id } = req.params;

    const pet = pets.find(pet => pet.id === id);

    res.send(pet);
}

const addPet = (req, res) => {
    const { name } = req.body;
    const { category: { name: categoryName } } = req.body;
    const { status } = req.body;
    let photoUrls = []
    if (req.body.hasOwnProperty('photoUrls')) {
        photoUrls = [...req.body.photoUrls];
    }
    let newTags = []
    if (req.body.hasOwnProperty('tags')) {
        req.body.tags.forEach((tag) => {
            newTags.push({
                id: uuidv4(),
                name: tag
            });
        });
    }

    const newPet = {
        id: uuidv4(),
        name,
        category: {
            id: categories[categoryName],
            name: categoryName,
        },
        photoUrls,
        tags: [...newTags],
        status
    }

    // newPet.category['id'] = getCategoryID(category);

    pets = [...pets, newPet];

    res.code(201).send(newPet);
}


const deletePet = (req, res) => {
    const { id } = req.params;
    pets = pets.filter(item => item.id !== id);

    res.send({ message: `Pet ${id} has been removed.` })
}

const updatePet = (req, res) => {
    const { id } = req.params;
    const { status } = req.body;

    pets.forEach((pet) => {
        if (pet.id === id) {
            pet.status = status;
        }
    });

    let pet = pets.find(pet => pet.id === id);

    res.send(pet);
}

module.exports = {
    getPets,
    getPet,
    addPet,
    deletePet,
    updatePet
}

