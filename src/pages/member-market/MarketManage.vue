<script lang="ts">
import { useMemberMarktetStore } from 'src/stores/member-market-store'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const { findMarkets } = useMemberMarktetStore()
    onMounted(async () => {
      rows.value = await findMarkets({
        area: '',
      })
    })
    const rows = ref([])
    const columns = [
      { name: 'name', required: true, label: '시장 이름', field: 'name' },
      { name: 'type', required: true, label: '시장 종류', field: 'type' },
      { name: 'address', required: true, label: '주소', field: 'address' },
      {
        name: 'nameAddress',
        required: true,
        label: '도로명 주소',
        field: 'nameAddress',
      },
    ]
    const state = { columns }
    const action = { rows }
    return {
      ...state,
      ...action,
    }
  },
})
</script>

<template>
  <div class="q-pa-md">
    <q-table
      flat
      bordered
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      dark
      color="amber"
    />
  </div>
</template>
