import { resolve } from 'path'
import * as fs from 'fs'

export const returnListAxiesFound = (): number[] => {
  const rawdata: any = fs.readFileSync(resolve(__dirname, '..', 'axies-found.json'))
  const list = JSON.parse(rawdata)

  return list.axiesId
}
