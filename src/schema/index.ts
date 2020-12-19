var { buildSchema } = require('graphql');

module.exports = buildSchema(`

  type Query {
    user(id: Int!): Person
    users(shark: String): [Person]
  },

  extend type Query {
    filterOptions(
      filterKey: FilterKey!
      queryRangeStart: Date
      queryRangeEnd: Date
      searchText: String
      orderBy: FilterOptionOrderBy
      filter: ProjectsFilterInput
      offset: Int
      limit: Int
    ): [FilterOption!]!
  }

  type Person {
    id: Int
    name: String
    age: Int
    shark: String
  }

`);
