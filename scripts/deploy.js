import path from 'path'
import fs from 'fs'
import ghpages from 'gh-pages'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const buildDir = path.resolve(__dirname, '../build')

console.log('------------------------')
console.log('Start deploying...')

ghpages.publish(buildDir, function (err) {
  if (err) {
    console.log('😭😭 Failed to deploy')
    return
  }

  fs.rmSync(buildDir, { recursive: true, force: true })
  console.log('🚀🚀🚀 Successfully deployed')
})
