import { addPlugins } from 'webpack-blocks'
import { ProvidePlugin } from 'webpack'

export default function(config) {
  return addPlugins([
    new ProvidePlugin({
      gettext: ['@cranium/i18n', 'gettext'],
      pgettext: ['@cranium/i18n', 'pgettext'],
      ngettext: ['@cranium/i18n', 'ngettext'],
      npgettext: ['@cranium/i18n', 'npgettext'],
      interpolate: ['@cranium/i18n', 'interpolate'],
    }),
  ])
}
