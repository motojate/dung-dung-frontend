<script lang="ts">
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

    const goCharacterManage = () => {
      router.replace({ name: 'CharacterManage' })
    }

    const goCalendarManage = () => {
      router.replace({ name: 'CalendarManage' })
    }

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const test = () => {
      console.log(1)
    }

    const state = { leftDrawerOpen }
    const action = {
      logout,
      toggleLeftDrawer,
      goCharacterManage,
      goCalendarManage,
      test,
    }
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

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered class="bg-grey-4">
      <q-list>
        <q-item-label header> 메뉴 </q-item-label>
        <q-separator />
        <q-item clickable v-ripple @click="goCharacterManage">
          <q-item-section avatar>
            <q-icon name="monetization_on" />
          </q-item-section>
          <q-item-section>도박하러 가기</q-item-section>
          <q-item-section side>Side</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable v-ripple @click="goCalendarManage">
          <q-item-section avatar>
            <q-icon name="calendar_month" />
          </q-item-section>
          <q-item-section>내 일정 보기</q-item-section>
          <q-item-section side>Side</q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>
