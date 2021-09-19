import chalk from 'chalk'

import { AxieMarketplaceService, BotTelegramService } from '@services/index'
import { Axie, InformationsAxieMessage } from '@interfaces/index'
import { formatterMessageTelegram, logger, returnListAxiesFound, writeValuesInListAxies } from '@utils/index'

export class AxieMarketplaceController {

  constructor(
    private readonly axieMarketplaceService: AxieMarketplaceService,
    private readonly botTelegramService: BotTelegramService
  ) {}

  async search() {
    const log = logger()

    try {
      const result = await this.axieMarketplaceService.loadNewsAxiesListenMarketplace()
      const resultLoadAxies = await result.json()
      const axies: Axie[] = resultLoadAxies?.data?.axies?.results ? resultLoadAxies.data.axies.results : []
      const axiesFoundPreviously = returnListAxiesFound()
      let axiesWithSuggestedPrice = 0

      for (const axie of axies) {
        const suggestedValue = parseFloat(process.env.SUGGESTED_VALUE_IN_DOLLARS)
        const priceAxieInDollars = axie?.auction?.currentPriceUSD ? parseFloat(axie.auction.currentPriceUSD) : null
        const axieFoundPreviously = axiesFoundPreviously.find(id => id === axie.id)

        if (priceAxieInDollars !== null && suggestedValue >= priceAxieInDollars && !axieFoundPreviously) {
          const data: InformationsAxieMessage = {
            id: axie.id,
            name: axie.name,
            class: axie.class,
            price: axie.auction.currentPriceUSD
          }
          const newListAxiesFound = axiesFoundPreviously.concat(axie.id)
          axiesWithSuggestedPrice += 1

          const message = formatterMessageTelegram(data)
          this.botTelegramService.sendMessage(message)
          writeValuesInListAxies(newListAxiesFound)

          log(chalk.bgGreen('Axie found, informations:'))
          log(data)
        }
      }

      log(chalk.bgGreen(`Axies found: ${axiesWithSuggestedPrice}`))
    } catch (error) {
      log(chalk.bgRed('Error processing axies data'))
    }
  }
}
