const fs = require('fs')
const path = require('path')

// 过滤前后空格以及单引号,双引号
const REG = /(^['"\s]*)|(['"\s]*$)/g

function load(finalPath) {
  if (!finalPath) return {}
  try {
    const content = fs.readFileSync(finalPath, 'utf-8')
    const list = content.toString().match(/\S+/gm)
    return list.reduce((accu, curr) => {
      let [key, value] = curr.split('=')

      key = key.replace(REG, '')
      value = value.replace(REG, '')

      process.env[key] = value
      accu[key] = value
      return accu
    }, {})
  } catch (err) {
    // only ignore error if file is not found
    if (err.toString().indexOf('ENOENT') < 0) {
      throw new Error(err)
    }
    return {}
  }
}

function dotenv({ mode = '' } = {}) {
  // .env
  const envPath = path.resolve(process.cwd(), '.env')
  // .env.local
  const envLocalPath = `${envPath}.local`
  // .env.[mode]
  const modePath = mode ? `${envPath}.${mode}` : ''
  // .env.[mode].local
  const modeLocalPath = mode ? `${envPath}.${mode}.local` : ''

  return {
    ...load(envPath),
    ...load(envLocalPath),
    ...load(modePath),
    ...load(modeLocalPath),
  }
}

module.exports = dotenv
module.exports.default = dotenv
