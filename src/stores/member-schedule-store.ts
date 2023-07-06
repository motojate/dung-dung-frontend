import { defineStore } from 'pinia'
import {
  CREATE_SCHEDULE_FROM_USER,
  FIND_SCHEDULE_FROM_USER_AND_MONTH,
} from 'src/graphql/member-schedule'
import { useMutation, useQuery } from 'villus'
import { ref } from 'vue'

export const useMemberScheduleStore = defineStore('member-schedule', () => {
  const memberUserSchedule = ref()

  const findScheduleFromUserAndMonth = async (month: number) => {
    const { data } = await useQuery({
      query: FIND_SCHEDULE_FROM_USER_AND_MONTH,
      variables: {
        month: month,
      },
      cachePolicy: 'network-only',
    })
    memberUserSchedule.value = data?.value?.findByScheduleFromUserAndMonth
  }

  const { execute: createScheduleFromUser } = useMutation(
    CREATE_SCHEDULE_FROM_USER
  )

  const state = { memberUserSchedule }
  const action = {
    findScheduleFromUserAndMonth,
    createScheduleFromUser,
  }

  return { ...state, ...action }
})
