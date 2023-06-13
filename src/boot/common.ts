import { boot } from 'quasar/wrappers'
import { defaultPlugins, useClient } from 'villus'
import { authPlugin } from 'src/composables/interceptor'

export default boot(({ app }) => {
  const client = useClient({
    url: '/api/graphql',
    use: [authPlugin, ...defaultPlugins()],
  })
  console.log(client)
  app.use(client)
})
