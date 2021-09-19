require('dotenv').config()
const cron = require('node-cron')
import chalk from 'chalk'

import { AxieMarketplaceController } from '@controllers/index'
import { AxieMarketplaceService, BotTelegramService } from '@services/index'
import { logger } from '@utils/index'

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