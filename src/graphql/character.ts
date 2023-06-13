import gql from 'graphql-tag'

export const SELECT_CHARACTER = gql`
  query selectCharacter {
    selectCharacter {
      name
      grade
      season
      users {
        userId
      }
    }
  }
`
