import { InformationsAxieMessage } from 'src/interfaces'

export const formatterMessageTelegram = (data: InformationsAxieMessage) => {
  const { id, name, price } = data
  return `Hello trainer axie, we found an axie with a price of $${price}, it is of type ${data.class}, it has the name ${name}, follow the link below to purchase: https://marketplace.axieinfinity.com/axie/${id}`
}
