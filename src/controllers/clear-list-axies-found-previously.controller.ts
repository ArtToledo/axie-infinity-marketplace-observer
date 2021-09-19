import chalk from 'chalk'

import { logger, writeValuesInListAxies } from '@utils/index'

export class ClearListAxiesFoundPreviouslyController {

  constructor() {}

  async clear() {
    const log = logger()

    try {
      writeValuesInListAxies([])
      log(chalk.bgGreen('Cleaning completed successfully!'))
    } catch (error) {
      log(chalk.bgRed('Error clearing list'))
    }
  }
}
