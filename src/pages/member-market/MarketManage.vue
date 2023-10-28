<script lang="ts">
import { useMemberMarktetStore } from 'src/stores/member-market-store'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  setup() {
    const { findMarkets } = useMemberMarktetStore()
    const selectedOption = ref({ label: '전체', value: 'ALL' })
    const dropdownOptions = ref([
      { label: '전체', value: 'ALL' },
      { label: '서울', value: 'SEOUL' },
      { label: '경기', value: 'GYEONGGI' },
      { label: '인천', value: 'INCHEON' },
    ])
    onMounted(async () => {
      rows.value = await findMarkets({
        area: 'ALL',
      })
    })
    const handleDataChange = async () => {
      console.log(selectedOption.value)
      rows.value = await findMarkets({
        area: selectedOption.value.value,
      })
    }
    const rows = ref([])
    const columns: any = [
      {
        name: 'name',
        required: true,
        label: '시장 이름',
        field: 'name',
        align: 'left',
      },
      { name: 'type', required: true, label: '시장 종류', field: 'type' },
      { name: 'address', required: true, label: '주소', field: 'address' },
      {
        name: 'nameAddress',
        required: true,
        label: '도로명 주소',
        field: 'nameAddress',
      },
    ]
    const state = { rows, columns, selectedOption, dropdownOptions }
    const action = { handleDataChange }
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
      title="시장조사"
      :rows="rows"
      :columns="columns"
      row-key="name"
      color="amber"
      :rows-per-page-options="[100]"
      :rows-per-page="100"
    >
      <template v-slot:top-right>
        <q-select
          v-model="selectedOption"
          :options="dropdownOptions"
          option-label="label"
          option-value="value"
          label="선택하세요"
          filled
          @update:model-value="handleDataChange"
        />
      </template>
    </q-table>
  </div>
</template>
