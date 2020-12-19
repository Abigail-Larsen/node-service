var { buildSchema } = require('graphql');

module.exports = buildSchema(`

    extend type Query {
        user2(id: Int!): Dog
    },

    type Dog {
        id: Int
        name: String
        age: Int
        breed: String
    }

`);
