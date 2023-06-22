import { defineStore } from 'pinia'
import { SELECT_CHARACTER } from 'src/graphql/character'
import { useQuery } from 'villus'

export const useMemberCharacterStore = defineStore('member-character', () => {
  const selectCharacter = async (): Promise<string> => {
    const { data } = await useQuery({
      query: SELECT_CHARACTER,
      cachePolicy: 'network-only',
    })
    return data?.value?.selectCharacter
  }

  const state = {}
  const action = {
    selectCharacter,
  }

  return { ...state, ...action }
})
