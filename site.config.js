import data from './src/data/data.js'

const config = {
  site: {
    title: 'TinyGenerator',
    basePath: process.env.BASE_URL,
    description: 'Generador de sitios estáticos simple con NodeJS',
    data
  },
  build: {
    outputPath: process.env.NODE_ENV === 'production' ? './docs' : './public'
  }
}

export { config }
