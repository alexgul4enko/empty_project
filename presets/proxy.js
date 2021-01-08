import { devServer, env, group } from 'webpack-blocks'


export default function(config) {
  return group([
    env('development', [
      devServer({
        proxy: configureProxy(),
      }),
    ]),
  ])
}

function configureProxy() {
  const ret = [
    // proxy API and other paths from env.PROXY
    makeProxyContext(JSON.parse(process.env.PROXY), process.env.PROXY_URL),
  ]

  if(process.env.SSR) {
    // proxy templates
    ret.push(
      makeProxyContext([
        '/**',
        `!${process.env.PUBLIC_PATH}`,
      ], process.env.BACKEND_URL)
    )
  }

  return ret
}

function makeProxyContext(paths, targetUrl) {
  const urlData = new URL(targetUrl)
  return {
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
    headers: { host: urlData.host, referer: urlData.origin },
    auth: urlData.auth,
    target: urlData.protocol + '//' + urlData.host,
    router: makeRouter(urlData),
    context: paths,
    bypass: (req, res) => bypass(req, res, urlData),
    onProxyRes,
  }
}

function makeRouter(urlData) {
  return function router(req) {
    const MAIN_HOST = process.env.MAIN_HOST
    const subdomain = MAIN_HOST && req.headers.host.includes(MAIN_HOST)
      ? req.headers.host.split(MAIN_HOST)[0]
      : ''

    const proxyUrl = urlData.protocol + '//' + subdomain + urlData.host

    return proxyUrl
  }
}


function bypass(req, res, urlData) {
  if(req.headers && req.headers.referer) {
    var url = new URL(req.headers.referer)
    url.host = urlData.host
    url.protocol = urlData.protocol
    url.port = ''
    req.headers.referer = url.href
  }
}

function onProxyRes(proxyResponse) {
  if(proxyResponse.headers['set-cookie']) {
    const cookies = proxyResponse.headers['set-cookie'].map(cookie =>
      cookie.replace(/; secure/gi, '')
    )
    proxyResponse.headers['set-cookie'] = cookies
  }
}
