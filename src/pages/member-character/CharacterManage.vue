<script lang="ts">
import { storeToRefs } from 'pinia'
import { useQuasar } from 'quasar'
import { useMemberCharacterStore } from 'src/stores/member-character.store'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const $q = useQuasar()
    const store = useMemberCharacterStore()
    const { selectCharacter } = store
    const { result } = storeToRefs(store)

    const state = { result }
    const action = { selectCharacter }
    return {
      ...state,
      ...action,
    }
  },
})
</script>

<template>
  결과: {{ result }} <q-separator />
  <q-btn @click="selectCharacter" rounded flat label="뽑기" />
</template>
