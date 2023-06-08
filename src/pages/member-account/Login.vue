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
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="bg-orange text-white">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img
              src="https://item.kakaocdn.net/do/6083fdfd2167d251eff093256f7ee68241d1a2caccd0c566eab28b91e2e5d306"
            /> </q-avatar
          >둥둥이의 캘린더
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <q-page>
        <q-card>
          <q-card-section> 초코 - BackOffice </q-card-section>
          <q-card-section>
            <q-input
              square
              outlined
              placeholder=""
              class="text-input-area mx-0 w-100"
              color="admin-gray1"
            />

            <strong class="admin-input-label">비밀번호</strong>
            <q-input
              square
              outlined
              type="password"
              name="password"
              placeholder=""
              class="text-input-area mx-0 w-100"
              color="admin-gray1"
            />

            <q-btn
              square
              unelevated
              class="admin-btn pink w-100"
              label="로그인"
              type="submit"
            />

            <q-separator />
            <q-btn
              square
              unelevated
              class="admin-btn text-pink w-50"
              label="계정 신청"
              style="border: solid 1px gainsboro"
            /><q-btn
              square
              unelevated
              class="admin-btn w-50 text-pink"
              label="비밀번호 찾기"
              style="border: solid 1px gainsboro"
            />
          </q-card-section>
        </q-card>
        <span class="copyright-text"
          >ⓒBU-LU-MAX N CO., LTD. ALL Right Reserved</span
        >
      </q-page>
    </q-page-container>
  </q-layout>
</template>
