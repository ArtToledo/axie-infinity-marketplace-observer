export interface Axie {
  id: number
  class: string
  name: string
  auction: Auction
}

type Auction = {
  currentPriceUSD: string
}