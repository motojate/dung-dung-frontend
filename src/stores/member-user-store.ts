import { defineStore } from 'pinia'
import { FIND_ALL_MEMBER_USER } from 'src/graphql/member-user'
import { useQuery } from 'villus'

export const useMemberUserStore = defineStore('member-user', () => {
  const findAllMemberUser = async () => {
    const { data } = await useQuery({
      query: FIND_ALL_MEMBER_USER,
      cachePolicy: 'network-only',
    })
    return data?.value?.findAllMemberUser
  }

  const state = {}
  const action = { findAllMemberUser }

  return { ...state, ...action }
})
