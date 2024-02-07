import fse from 'fs-extra'
import path from 'path'
import 'dotenv/config'
import pug from 'pug'
import frontMatter from 'front-matter'
import markdownit from 'markdown-it'
import { glob } from 'glob'
import { config } from '../site.config.js'

const build = async () => {
  const srcPath = './src'
  const distPath = config.build.outputPath // Folder deploy

  fse.emptyDirSync(distPath)
  fse.rmdirSync(distPath)

  fse.copy(`${srcPath}/assets`, `${distPath}/assets`)

  const files = await glob(
    '**/*.@(pug|html|md)', // File type sopported
    { cwd: `${srcPath}/pages` }
  )

  files.forEach((file) => {
    const fileData = path.parse(file)
    const destPath = path.join(distPath, fileData.dir)

    fse.mkdirsSync(destPath) // create destination directory

    const data = fse.readFileSync(`${srcPath}/pages/${file}`, 'utf-8') // read page file

    // render page
    const pageData = frontMatter(data)
    const templateConfig = Object.assign({}, config, {
      page: pageData.attributes
    })
    let pageContent

    // generate page content according to file type
    switch (fileData.ext) {
      case '.md': {
        const md = markdownit()
        pageContent = md.render(pageData.body)
        break
      } case '.pug':
        pageContent = pug.renderFile(`${srcPath}/pages/${file}`, templateConfig)
        break
      default:
        pageContent = pageData.body
    }

    // create destination directory
    fse.mkdirsSync(destPath)

    const layout = 'default'
    const layoutFileName = `${srcPath}/layouts/${layout}.pug`
    const layoutData = fse.readFileSync(layoutFileName, 'utf-8')
    const configLayout = Object.assign({}, templateConfig, {
      body: pageContent,
      filename: layoutFileName
    })
    const completePage = pug.render(layoutData, configLayout)

    // save the html file
    fse.writeFileSync(`${destPath}/${fileData.name}.html`, completePage)
  })
}

export default build
