require('dotenv').config()
const cron = require('node-cron')
import chalk from 'chalk'

import { AxieMarketplaceController } from 'src/controllers'
import { AxieMarketplaceService, BotTelegramService } from 'src/services'
import { logger } from 'src/utils'

const main = async () => {
  //Services
  const axieMarketplaceService = new AxieMarketplaceService()
  const botTelegramService = new BotTelegramService()

  //Controllers
  const axieMarketplaceController = new AxieMarketplaceController(
    axieMarketplaceService,
    botTelegramService
  )

  //Utils
  const log = logger()

  botTelegramService.watchMessages()
  cron.schedule('*/3 * * * *', async () => {
    log(chalk.bgBlue('Starting the search for axies...'))
    await axieMarketplaceController.search()
  })
}

main()