const fastify = require('fastify')({ logger: true });
fastify.register(require('fastify-swagger'), {
    exposeRoute: true,
    routePrefix: '/docs',
    swagger: {
        "tags": [{
            "name": "pet",
            "description": "Everything about your Pets",
            "externalDocs": { "description": "Find out more", "url": "http://swagger.io" }
        }, {
            "name": "store",
            "description": "Access to Petstore orders",
            "externalDocs": { "description": "Find out more about our store", "url": "http://swagger.io" }
        }, {
            "name": "user",
            "description": "Operations about user"
        }],
        info: {
            title: 'Swagger Petstore - OpenAPI 3.0',
            description: `This is a sample Pet Store Server based on the OpenAPI 3.0 specification. 
            You can find out more about Swagger at http://swagger.io. In the third iteration of the pet store, 
            we've switched to the design first approach! You can now help us improve the API whether it's by making 
            changes to the definition itself or to the code. That way, with time, we can improve the API in general, 
            and expose some of the new features in OAS3.`,
        },
        externalDocs: {
            url: 'https://swagger.io/terms',
            description: 'Terms of service'
        },

    },
});


const petRoutes = require('./routes/pet');

fastify.register(petRoutes);

const PORT = 3000;


const start = async () => {
    try {
        await fastify.listen(PORT);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
}

start()