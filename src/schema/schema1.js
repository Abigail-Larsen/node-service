var { buildSchema } = require('graphql');

module.exports = buildSchema(`

    type Query {
        user(id: Int!): Friend
    },

    type Friend {
        id: Int
        name: String
        age: Int
        birthday: String
    }

`);
