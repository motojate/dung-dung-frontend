import gql from 'graphql-tag'

export const GET_MARKETS = gql`
  query getMarkets($marketFilterInput: MarketFilterInput!) {
    getMarkets(marketFilterInput: $marketFilterInput) {
      name
      address
      type
      nameAddress
    }
  }
`
