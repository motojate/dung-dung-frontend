import gql from 'graphql-tag'

export const FIND_ALL_MEMBER_USER = gql`
  query findAllMemberUser {
    findAllMemberUser {
      id
      userId
      schedules {
        title
        calendar {
          month
        }
      }
    }
  }
`

export const LOGIN_MEMBER_USER = gql`
  mutation loginMemberUser($loginMemberUserInput: LoginMemberUserInput!) {
    loginMemberUser(loginMemberUserInput: $loginMemberUserInput)
  }
`

export const SIGN_UP_MEMBER_USER = gql`
  mutation signUpMemberUser($signUpMemberUserInput: SignUpMemberUserInput!) {
    signUpMemberUser(signUpMemberUserInput: $signUpMemberUserInput)
  }
`
