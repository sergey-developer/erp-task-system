import path from 'path'

const resolvePath = (p: string) => path.resolve(__dirname, p)

module.exports = {
  webpack: {
    alias: {
      modules: resolvePath('./src/modules'),
      components: resolvePath('./src/components'),
    },
  },
}
