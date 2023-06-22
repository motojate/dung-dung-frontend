import { boot } from 'quasar/wrappers'
import { defaultPlugins, useClient } from 'villus'
import { useInterceptor } from 'src/composables/interceptor'

export default boot(({ app }) => {
  const { defaultVillusPlugin } = useInterceptor()

  const client = useClient({
    url: '/api/graphql',
    use: defaultVillusPlugin(),
  })
  // const { defaultVillusPlugin } = useInterceptor()
  // const client = useClient({
  //   url: '/api/graphql',
  //   use: defaultVillusPlugin(),
  // })
  // console.log(client)
  app.use(client)
})
