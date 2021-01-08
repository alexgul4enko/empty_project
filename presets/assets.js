import { file, group, match } from 'webpack-blocks'

export default function(config) {
  return group([
    match(['*.eot', '*.ttf', '*.woff', '*.woff2', '*.png', '*.jpg', '*.svg'], [
      file(),
    ]),
  ])
}
