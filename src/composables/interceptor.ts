import { storeToRefs } from 'pinia'
import { useMemberUserStore } from 'src/stores/member-user-store'

export const authPlugin = ({ opContext }: any) => {
  const memberUserStore = useMemberUserStore()
  const { token } = storeToRefs(memberUserStore)
  if (token.value) {
    opContext.headers.Authorization = `Bearer ${token.value}`
  } else return

  console.log(opContext)
}
