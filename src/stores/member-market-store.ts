import { defineStore } from 'pinia'
import { GET_MARKETS } from 'src/graphql/market'
import { useQuery } from 'villus'

export const useMemberMarktetStore = defineStore('member-market', () => {
  const findMarkets = async (dto: { area: string }) => {
    const { data } = await useQuery({
      query: GET_MARKETS,
      variables: {
        marketFilterInput: dto,
      },
      cachePolicy: 'network-only',
    })
    return data?.value?.getMarkets
  }
  const state = {}
  const action = { findMarkets }

  return { ...state, ...action }
})
