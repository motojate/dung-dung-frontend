import { boot } from 'quasar/wrappers'
import { useClient } from 'villus'
import { useInterceptor } from 'src/composables/interceptor'

export default boot(({ app }) => {
  const { defaultVillusPlugin } = useInterceptor()

  const client = useClient({
    url: '/api/graphql',
    use: defaultVillusPlugin(),
  })

  app.use(client)
})
