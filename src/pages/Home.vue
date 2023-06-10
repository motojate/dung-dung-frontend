<script lang="ts">
import { useMemberUserStore } from 'src/stores/member-user-store'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'HomePage',
  setup() {
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
