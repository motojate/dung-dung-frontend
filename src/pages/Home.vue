<script lang="ts">
import { useMemberUserStore } from 'src/stores/member-user-store'
import { defineComponent, onMounted, ref } from 'vue'

export default defineComponent({
  name: 'HomePage',
  setup() {
    const store = useMemberUserStore()
    const { findAllMemberUser } = store
    const tab = ref<string>('Ahn')
    const userList = ref()

    onMounted(async () => {
      userList.value = await findAllMemberUser()
    })

    const state = { userList, tab }
    const action = {}
    return {
      ...state,
      ...action,
    }
  },
})
</script>

<template>
  <div class="q-pa-md">
    <div style="max-width: 600px">
      <q-tabs v-model="tab" align="justify" narrow-indicator class="q-mb-lg">
        <q-tab class="text-purple" name="Ahn" label="Ahn" />
        <q-tab class="text-orange" name="Kang" label="Kang" />
        <q-tab class="text-teal" name="Choi" label="Choi" />
      </q-tabs>

      <div class="q-gutter-y-sm">
        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="scale"
          transition-next="scale"
          class="bg-purple text-white text-center"
        >
          <q-tab-panel name="Ahn">
            <div class="text-h6">Ahn</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="Kang">
            <div class="text-h6">Kang</div>
            Ad molestiae non facere animi nobis, similique nemo velit.
          </q-tab-panel>

          <q-tab-panel name="Choi">
            <div class="text-h6">Choi</div>
            Nostrum necessitatibus expedita dolores? Voluptatem.
          </q-tab-panel>
        </q-tab-panels>

        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="fade"
          transition-next="fade"
          class="bg-orange text-white text-center"
        >
          <q-tab-panel name="Ahn">
            <div class="text-h6">Ahn</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="Kang">
            <div class="text-h6">Kang</div>
            Ad molestiae non facere animi nobis, similique nemo.
          </q-tab-panel>

          <q-tab-panel name="Choi">
            <div class="text-h6">Choi</div>
            Nostrum necessitatibus expedita dolores? Voluptatem.
          </q-tab-panel>
        </q-tab-panels>

        <q-tab-panels
          v-model="tab"
          animated
          transition-prev="jump-up"
          transition-next="jump-down"
          class="bg-teal text-white text-center"
        >
          <q-tab-panel name="Ahn">
            <div class="text-h6">Ahn</div>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </q-tab-panel>

          <q-tab-panel name="Kang">
            <div class="text-h6">Kang</div>
            Ad molestiae non facere animi nobis, similique nemo.
          </q-tab-panel>

          <q-tab-panel name="Choi">
            <div class="text-h6">Choi</div>
            Nostrum necessitatibus expedita dolores? Voluptatem.
          </q-tab-panel>
        </q-tab-panels>
      </div>
    </div>
  </div>
</template>
