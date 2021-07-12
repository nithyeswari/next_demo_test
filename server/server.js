const { ApolloServer, gql, ApolloError, MockList } = require('apollo-server-express');
const ProfileAPI = require('./datasources/profiles');
const express = require('express');
const typeDefs = require('./schema');
const resolvers = require('./resolver');
/* To fetch schema using introspection
const {buildClientSchema} = require('graphql');
const results = require('introspectionResults.json');
const schema = buildClientSchema(results.data); 
//pass this schema to Apollo server.
*/

const { createRateLimitTypeDef, createRateLimitDirective, defaultKeyGenerator } = require('graphql-rate-limit-directive');
const depthLimit = require('graphql-depth-limit');
const { createComplexityLimitRule } = require('graphql-validation-complexity');


//TODO:custom,skip and include directive
//TODO:convert to typescript
//TODO:Test


const mocks = {
    String: () => 'hello',
    Query: () => {
        profiles: () => new MockList(1000)
    }
}
async function startApolloServer() {
    const dataSources = () => ({
        profileAPI: new ProfileAPI()
    });
    const server = new ApolloServer({
        introspection: true,
        playground: true,
        apiKey: process.env.ENGINE_API_KEY,
        typeDefs: [createRateLimitTypeDef(), typeDefs],
        resolvers,
        dataSources,
        /*mocks:true,
        mocks,
        mockEntireSchema:true,*/
        schemaDirectives: {
            //TODO:restrict based on user
            rateLimit: createRateLimitDirective(),

        },
        
        validationRules: [
            //depthLimit(1)

        ],
        formatError: (err) => {
            console.log(err)
            if (err.extensions.code === 'INTERNAL_SERVER_ERROR') {
                return new ApolloError("We are having trouble", "ERROR", { token: Math.random, err: err.message });
                //TODO:store and can be referred later when user raises ticket.
            }
            return err;
        }
    });
    //await server.start();
    const app = express(); 
    server.applyMiddleware({ app, path: '/graphql' }); 
    app.listen({ port: process.env.PORT || 4000 },(url)=>{
        console.log(process.env.PORT || 4000);
        console.log(`Go to http://localhost:${process.env.PORT}/graphiql to run queries!`);

    });
}

startApolloServer();

