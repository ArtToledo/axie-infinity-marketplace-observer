import { resolve } from 'path'
import * as fs from 'fs'

export const writeValuesInListAxies = (ids: number[]) => {
  fs.writeFileSync(resolve(__dirname, '..', 'axies-found.json'), JSON.stringify({
    axiesId: ids
  }))
  return
}
