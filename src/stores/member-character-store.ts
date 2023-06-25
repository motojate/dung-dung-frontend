import { defineStore } from 'pinia'
import { SELECT_CHARACTER } from 'src/graphql/character'
import { useQuery } from 'villus'
import { ref } from 'vue'

export const useMemberCharacterStore = defineStore('member-character', () => {
  const result = ref()
  const selectCharacter = async () => {
    const { data } = await useQuery({
      query: SELECT_CHARACTER,
      cachePolicy: 'network-only',
    })
    result.value = data?.value?.selectCharacter
  }

  const state = { result }
  const action = {
    selectCharacter,
  }

  return { ...state, ...action }
})
