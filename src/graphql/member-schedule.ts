import gql from 'graphql-tag'

export const CREATE_SCHEDULE_FROM_USER = gql`
  mutation createScheduleFromUser($createScheduleInput: CreateScheduleInput!) {
    createScheduleFromUser(createScheduleInput: $createScheduleInput)
  }
`

export const FIND_SCHEDULE_FROM_USER_AND_MONTH = gql`
  query findByScheduleFromUserAndMonth($month: Float!) {
    findByScheduleFromUserAndMonth(month: $month) {
      title
      day
      isSpecial
    }
  }
`
