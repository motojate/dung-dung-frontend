<script lang="ts">
import { useQuasar } from 'quasar'
import { useMemberUserStore } from 'src/stores/member-user-store'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const $q = useQuasar()
    const store = useMemberUserStore()
    const { findAllMemberUser } = store

    const userList = ref()

    onMounted(async () => {
      userList.value = await findAllMemberUser()
    })

    const state = { userList }
    const action = {}
    return {
      ...state,
      ...action,
    }
  },
})
</script>

<template>
  {{ userList }}
</template>
