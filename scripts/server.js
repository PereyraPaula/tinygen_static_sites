import build from './build.js'
import server from './utils/serve.js'
import chokidar from 'chokidar'
import { logMessage } from './utils/functions.js'

function debounce (callback, wait) {
  let timerId
  return (...args) => {
    clearTimeout(timerId)
    timerId = setTimeout(() => {
      // eslint-disable-next-line n/no-callback-literal
      callback(...args)
    }, wait)
  }
}

const serve = async ({ srcPath, outputPath, port }) => {
  logMessage(`Starting local server at http://localhost:${port}`)

  await build()
  server({ path: outputPath, port })

  chokidar.watch(srcPath, { ignoreInitial: true }).on(
    'all',
    debounce(async () => {
      await build()
      logMessage('Waiting for changes...')
    }, 500)
  )
}

serve({ srcPath: './src/**/*.@(pug|html|md)', outputPath: './public', port: 3000 })
