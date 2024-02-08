import chalk from 'chalk'

const logMessage = (text, type = 'info') => {
  switch (type) {
    case 'error':
      console.error(chalk.white.bgRed.bold('ERROR'), chalk.red(text))
      break
    case 'warning':
      console.warn(chalk.black.bgYellow.bold('WARNING'), chalk.yellow(text))
      break
    case 'success':
      console.log(chalk.black.bgGreen.bold('SUCCESS'), chalk.green(text))
      break
    default:
      console.log(chalk.white.bgBlue.bold('INFO'), chalk.blue(text))
  }
}

export {
  logMessage
}
