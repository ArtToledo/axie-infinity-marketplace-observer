require('dotenv').config()
const cron = require('node-cron')
import chalk from 'chalk'

import { AxieMarketplaceController, ClearListAxiesFoundPreviouslyController } from '@controllers/index'
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
  const clearListAxiesFoundPreviouslyController = new ClearListAxiesFoundPreviouslyController()

  //Utils
  const log = logger()

  botTelegramService.watchMessages()
  cron.schedule('* * * * *', async () => {
    log(chalk.bgBlue('Starting the search for axies...'))
    await axieMarketplaceController.search()
  })

  cron.schedule('0 0 * * *', async () => {
    log(chalk.bgBlue('Starting cleanup of previously found axies list...'))
    await clearListAxiesFoundPreviouslyController.clear()
  })
}

main()