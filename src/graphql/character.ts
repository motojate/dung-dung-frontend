import gql from 'graphql-tag'

export const FIND_ALL_MEMBER_USER = gql`
  query selectCharacter {
    selectCharacter {
      name
      grade
      season
    }
  }
`
