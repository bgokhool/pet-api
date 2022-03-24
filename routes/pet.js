const {
    getPets,
    getPet,
    addPet,
    deletePet,
    updatePet
} = require('../controllers/pet-controller.js');

// Pet schema
const Pet = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        category: {
            type: 'object',
            properties: {
                id: { type: 'string' },
                name: { type: 'string' }
            },
        },
        photoUrls: {
            type: 'array',
            items: { type: 'string' },
        },
        tags: {
            type: 'array',
            items: {
                type: 'object',
                properties: {
                    id: { type: 'string' },
                    name: { type: 'string' }
                },
            },
        },
        status: { type: 'string' },
    },
};

// Options for get all pets
const getPetsOps = {
    schema: {
        tags: ["pet"],
        response: {
            200: {
                type: 'array',
                items: Pet
            },
        },
    },
    handler: getPets,
}

// Options for get single pet
const getPetOps = {
    schema: {
        tags: ["pet"],
        response: {
            200: Pet,
        },
    },
    handler: getPet,
}

// Options for adding single item
const postPetOps = {
    schema: {
        tags: ["pet"],
        response: {
            201: Pet
        },
    },
    handler: addPet,
}

// Options for deleting single pet
const deletePetOps = {
    schema: {
        tags: ["pet"],
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' },
                },
            },
        },
    },
    handler: deletePet,
}

// Options for get single item
const updatePetOps = {
    schema: {
        tags: ["pet"],
        response: {
            200: Pet,
        },
    },
    handler: updatePet,
}


function petRoutes(fastify, options, done) {

    // Get all items
    fastify.get('/pet', getPetsOps);

    // Get single item
    fastify.get('/pet/:id', getPetOps);

    // Add pet
    fastify.post('/pet', postPetOps);

    // Delete item
    fastify.delete('/pet/:id', deletePetOps);

    // Update item
    fastify.put('/pet/:id', updatePetOps);

    done();
}

module.exports = petRoutes;