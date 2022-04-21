import path from 'path'

const resolvePath = (p: string) => path.resolve(__dirname, p)

module.exports = {
  webpack: {
    alias: {
      configs: resolvePath('./src/configs'),
      modules: resolvePath('./src/modules'),
      components: resolvePath('./src/components'),
      state: resolvePath('./src/state'),
      shared: resolvePath('./src/shared'),
      app: resolvePath('./src/app'),
    },
  },
}
