import { defineStore } from 'pinia'
import {
  FIND_ALL_MEMBER_USER,
  LOGIN_MEMBER_USER,
  SIGN_UP_MEMBER_USER,
} from 'src/graphql/member-user'
import { useMutation, useQuery } from 'villus'
import { ref } from 'vue'

export const useMemberUserStore = defineStore(
  'member-user',
  () => {
    const token = ref<string | null>(null)
    const findAllMemberUser = async () => {
      const { data } = await useQuery({
        query: FIND_ALL_MEMBER_USER,
        cachePolicy: 'network-only',
      })
      return data?.value?.findAllMemberUser
    }

    const setToken = (loginToken: string) => {
      token.value = loginToken
    }

    const resetToken = () => {
      token.value = null
    }

    const { execute: loginMemberUser } = useMutation(LOGIN_MEMBER_USER)
    const { execute: signUpMemberUser } = useMutation(SIGN_UP_MEMBER_USER)
    const state = { token }
    const action = {
      findAllMemberUser,
      loginMemberUser,
      setToken,
      resetToken,
      signUpMemberUser,
    }

    return { ...state, ...action }
  },
  {
    persist: { key: 'user', paths: ['token'] },
  }
)
