<script lang="ts">
import router from 'src/router'
import { useMemberUserStore } from 'src/stores/member-user-store'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

export default defineComponent({
  name: 'MainLayout',

  setup() {
    const router = useRouter()
    const store = useMemberUserStore()
    const { resetToken } = store
    const leftDrawerOpen = ref(false)
    const logout = () => {
      resetToken()
      router.replace({ name: 'Login' })
    }

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const state = { leftDrawerOpen }
    const action = { logout, toggleLeftDrawer }
    return {
      ...state,
      ...action,
    }
  },
})
</script>

<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-orange text-white">
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> 포트폴리오 </q-toolbar-title>

        <div>
          <q-btn flat label="로그아웃" @click="logout"></q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
