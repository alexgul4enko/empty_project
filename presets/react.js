import { group, babel } from 'webpack-blocks'


export default function(config) {
  return group([
    babel({
      presets: [
        ['@babel/preset-react', {
          runtime: 'automatic',
        }],
        '@babel/preset-flow',
      ],
      plugins: [
        'react-refresh/babel',
      ],
    }),

  ])
}
