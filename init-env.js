import dotenv from 'dotenv'
import dotenvExpand from 'dotenv-expand'
import packageConfig from './package.json'


if(!process.env.APP_NAME) {
  process.env.APP_NAME = packageConfig.name
}

const config = dotenv.config({
  path: process.env.ENVFILE,
})

const configDefault = dotenv.config({
  path: '.env.default',
})

dotenvExpand(config)
dotenvExpand(configDefault)

export default process.env
