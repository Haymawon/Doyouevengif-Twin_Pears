import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { blogPosts } from '../src/data/posts.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.resolve(__dirname, '../dist')

function generatePostHTML(post: any) {
  const title = `${post.title} — Twin Pears`
  const description = post.excerpt
  const image = `https://doyouevengif.online${post.image}`
  const url = `https://doyouevengif.online/post/${post.slug}`

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title}</title>
  <meta name="description" content="${description}" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${title}" />
  <meta property="og:description" content="${description}" />
  <meta property="og:image" content="${image}" />
  <meta property="og:url" content="${url}" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${title}" />
  <meta name="twitter:description" content="${description}" />
  <meta name="twitter:image" content="${image}" />
  <link rel="shortcut icon" href="/logo.png" />
  <link rel="stylesheet" href="/assets/index.css" />
</head>
<body>
  <div id="app"></div>
  <script type="module" src="/assets/index.js"></script>
</body>
</html>`
}

function generateAll() {
  const postDir = path.join(distDir, 'post')
  if (!fs.existsSync(postDir)) fs.mkdirSync(postDir, { recursive: true })

  for (const post of blogPosts) {
    const slugDir = path.join(postDir, post.slug)
    if (!fs.existsSync(slugDir)) fs.mkdirSync(slugDir, { recursive: true })

    const html = generatePostHTML(post)
    fs.writeFileSync(path.join(slugDir, 'index.html'), html)
    console.log(`✅ Generated /post/${post.slug}/index.html`)
  }
}

generateAll()