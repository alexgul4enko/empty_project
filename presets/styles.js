import { css, env, extractText, group, match, sass, postcss, assets } from 'webpack-blocks'
import cssnano from 'cssnano'
import path from 'path'

export default function(config) {
  return group([
    match(['*.css'], [
      css({
        styleLoader: {
          insertAt: 'top',
        },
      }),
    ]),
    match(['*.sass', '*.scss'], { exclude: /node_modules/ }, [
      process.env.SSR ? css() : css.modules({ localsConvention: 'camelCaseOnly' }),
      sass({
        sassOptions: {
          includePaths: [
            path.resolve('./src/styles'),
            path.resolve('./node_modules'),
          ],
        },
      }),
      postcss({
        plugins: [cssnano()],
      }),
      env('production', [
        extractText('bundle.css'),
      ]),
    ]),
  ])
}
