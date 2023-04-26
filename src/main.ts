import * as core from '@actions/core'
import {diff} from 'json-diff'
import fs from 'fs'

async function run(): Promise<void> {
  try {
    const first: string = core.getInput('first')
    const second: string = core.getInput('second')
    core.debug('first:')
    core.debug(first)
    core.debug('second:')
    core.debug(second)

    core.debug(new Date().toTimeString())
    const firstJson = fs.readFileSync(first, 'utf8')
    const secondJson = fs.readFileSync(second, 'utf8')
    core.debug('firstJson:')
    core.debug(firstJson)
    core.debug('secondJson:')
    core.debug(secondJson)
    const df = diff(JSON.parse(firstJson), JSON.parse(secondJson))
    core.debug(new Date().toTimeString())

    core.setOutput('diff', df)
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
