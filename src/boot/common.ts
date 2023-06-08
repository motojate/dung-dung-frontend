import { boot } from 'quasar/wrappers'
import { useClient } from 'villus'

export default boot(({ app }) => {
  const client = useClient({
    url: '/api/graphql',
  })
  app.use(client)
})
