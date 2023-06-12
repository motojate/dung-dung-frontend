// import { useUserStore } from '../stores/user'
// import { createClient, onBeforeRetry, ClientPlugin } from 'villus'

// export const useInterceptor = () => {
//   const userStore = useUserStore()

//   const client = createClient({
//     url: 'YOUR_GRAPHQL_ENDPOINT',
//     headers: () => {
//       const token = userStore.getToken()
//       if (token) {
//         return {
//           Authorization: `Bearer ${token}`,
//         }
//       }
//       return {}
//     },
//   })

//   const defaultVillusPlugin: ClientPlugin[] = []

//   client.use([
//     beforeRetry(({ context }) => {
//       const token = userStore.getToken()
//       if (token) {
//         context.headers = {
//           ...context.headers,
//           Authorization: `Bearer ${token}`,
//         }
//       }
//     }),
//   ])

//   return { client, defaultVillusPlugin }
// }
