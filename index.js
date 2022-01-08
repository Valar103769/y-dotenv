const fs = require('fs')
const path = require('path')

// 过滤前后空格以及单引号,双引号
const REG = /(^['"\s]*)|(['"\s]*$)/g

function load(envPath) {
  try {
    const content = fs.readFileSync(envPath, 'utf-8')
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

function dot({ path: envPath, mode = '' } = {}) {
  const basePath = path.resolve(process.cwd(), `.env${mode ? `.${mode}` : ``}`)
  const localPath = `${basePath}.local`

  if (envPath) {
    return load(envPath)
  } else {
    return { ...load(basePath), ...load(localPath) }
  }
}

module.exports = dot
module.exports.default = dot
