import { boot } from 'quasar/wrappers'
import { useClient, fetch } from 'villus'

export default boot(({ app }) => {
  const client = useClient({
    url: '/api/graphql',
    use: [],
  })
  app.use(client)
})
