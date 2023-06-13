import { storeToRefs } from 'pinia'
import { useMemberUserStore } from 'src/stores/member-user-store'

interface OperationContext {
  opContext: {
    headers: {
      Authorization?: string
    }
  }
}
export const authPlugin = ({ opContext }: OperationContext) => {
  const memberUserStore = useMemberUserStore()
  const { token } = storeToRefs(memberUserStore)
  if (token.value) {
    opContext.headers.Authorization = `Bearer ${token.value}`
  } else return

  console.log(opContext)
}
