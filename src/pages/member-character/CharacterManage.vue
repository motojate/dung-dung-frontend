<script lang="ts">
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useMemberCharacterStore } from 'src/stores/member-character-store'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const $q = useQuasar()
    const store = useMemberCharacterStore()
    const { selectCharacter } = store
    const { result } = storeToRefs(store)
    const resultObj = ref<any>([])
    const selectCharacterTryTen = async () => {
      resultObj.value = await Promise.all(
        Array.from({ length: 10 }, async () => {
          await selectCharacter()
          return result.value
        })
      )
      console.log(1)
    }
    const state = { result, resultObj }
    const action = { selectCharacter, selectCharacterTryTen }
    return {
      ...state,
      ...action,
    }
  },
})
</script>

<template>
  결과: {{ result }} <q-separator /> 10번 결과 : {{ resultObj }}
  <q-separator />
  <q-btn
    @click="selectCharacterTryTen"
    rounded
    flat
    label="10번 뽑기"
  /><q-space />
  <q-btn @click="selectCharacter" rounded flat label="뽑기" />
</template>
