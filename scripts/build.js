import path from 'path'
import fs from 'fs'
import fsExtra from 'fs-extra'
import postcss from 'postcss'
import cssnano from 'cssnano'
import autoprefixer from 'autoprefixer'
import imagemin from 'imagemin'
import imageminJpegtran from 'imagemin-jpegtran'
import { fileURLToPath } from 'url'

const REPOSITORY_NAME = 'tomorrow-house'
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const buildDir = path.resolve(__dirname, '../build')
const { copySync } = fsExtra

const faviconFileList = [
  'android-chrome-192x192.png',
  'android-chrome-512x512.png',
  'apple-touch-icon.png',
  'browserconfig.xml',
  'favicon-16x16.png',
  'favicon-32x32.png',
  'favicon.ico',
  'mstile-150x150.png',
  'safari-pinned-tab.svg',
  'site.webmanifest',
]

const faviconUrlList = [
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/site.webmanifest',
  '/safari-pinned-tab.svg',
]

function throwError(err) {
  if (err) {
    console.log('💥 Oops! Something went wrong')
    console.error(err)
  }
}

function buildHtml() {
  fs.readFile(path.resolve(__dirname, '../index.html'), (err, data) => {
    if (err) throwError(err)

    let html = data.toString()
    html = html.replaceAll('href="/"', `href="/${REPOSITORY_NAME}"`)

    faviconUrlList.forEach((favicon) => {
      if (!!REPOSITORY_NAME) {
        const newFaviconUrl = favicon.replace('/', `/${REPOSITORY_NAME}/`)
        html = html.replace(favicon, newFaviconUrl)
      }
    })

    fs.writeFile(path.join(buildDir, 'index.html'), html, (err) => {
      throwError(err)
    })
  })
}

function buildCss() {
  const cssPath = path.join(__dirname, '../style.css')

  fs.readFile(cssPath, (err, css) => {
    if (err) {
      throwError(err)
      return
    }

    postcss([autoprefixer, cssnano])
      .process(css, { from: cssPath })
      .then((result) => {
        fs.writeFile(path.join(buildDir, 'style.css'), result.css, throwError)
      })
  })
}

function copyFavicons() {
  faviconFileList.forEach((filename) => {
    copySync(
      path.resolve(__dirname, `../${filename}`),
      path.join(buildDir, filename)
    )
  })
}

async function optimizeImageAssets() {
  try {
    await imagemin(
      [path.resolve(__dirname, '../assets/images/*.{jpg,png,svg}')],
      {
        destination: path.join(buildDir, 'assets/images'),
        plugins: [imageminJpegtran()],
      }
    )
  } catch (err) {
    throwError(err)
  }
}

async function build() {
  console.log('------------------------')
  console.log('Start building...')

  if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir)

  buildHtml()
  buildCss()

  copySync(
    path.resolve(__dirname, '../index.html'),
    path.join(buildDir, 'index.html')
  )
  copySync(path.resolve(__dirname, '../js'), path.join(buildDir, 'js'))
  copySync(
    path.resolve(__dirname, '../assets/fonts'),
    path.join(buildDir, 'assets/fonts')
  )
  copyFavicons()

  await optimizeImageAssets()

  console.log('🎉 Successfully build your project')
  console.log('🔜 Ready to deploy')
}

build()
