<script lang="ts">
import { useQuasar } from 'quasar'
import { ref, computed } from 'vue'
import CalendarCreate from 'src/components/member-calendar/CalendarCreate.vue'

export default {
  components: {
    CalendarCreate,
  },

  setup() {
    const currentDate = ref<Date>(new Date())
    const rightDrawerOpen = ref<boolean>(false)
    const miniState = ref<boolean>(true)
    const leftDrawerOpen = ref<boolean>(false)
    const expanded = ref<boolean>(false)
    const $q = useQuasar()
    const viewCreateDialog = ref<boolean>(false)
    const currentMonth = computed(() => {
      const options: any = {
        month: 'long',
        year: 'numeric',
      }
      return currentDate.value.toLocaleDateString(undefined, options)
    })

    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

    const calendarDates = computed(() => {
      const year = currentDate.value.getFullYear()
      const month = currentDate.value.getMonth()
      const firstDay = new Date(year, month, 1)
      const lastDay = new Date(year, month + 1, 0)
      const dates = []

      for (let date = 1; date <= lastDay.getDate(); date++) {
        dates.push(date)
      }

      const startOffset = firstDay.getDay()

      for (let i = 0; i < startOffset; i++) {
        dates.unshift('')
      }

      return dates
    })

    function previousMonth() {
      currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() - 1
      )
    }

    function nextMonth() {
      currentDate.value = new Date(
        currentDate.value.getFullYear(),
        currentDate.value.getMonth() + 1
      )
    }

    function isToday(date: any) {
      const today = new Date()
      return (
        date === today.getDate() &&
        currentDate.value.getMonth() === today.getMonth() &&
        currentDate.value.getFullYear() === today.getFullYear()
      )
    }

    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value
    }

    const drawerClick = (e: any) => {
      // if in "mini" state and user
      // click on drawer, we switch it to "normal" mode
      if (miniState.value) {
        miniState.value = false

        // notice we have registered an event with capture flag;
        // we need to stop further propagation as this click is
        // intended for switching drawer to "normal" mode only
        e.stopPropagation()
      }
    }

    const state = {
      currentMonth,
      days,
      calendarDates,
      leftDrawerOpen,
      rightDrawerOpen,
      viewCreateDialog,
      miniState,
      expanded,
    }
    const action = {
      previousMonth,
      nextMonth,
      isToday,

      toggleRightDrawer,
      drawerClick,
    }

    return {
      ...state,
      ...action,
    }
  },
}
</script>

<template>
  <q-layout view="hHr lpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          둥둥이의 캘린더
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      :mini="miniState"
      @click.capture="drawerClick"
      :width="400"
      :breakpoint="500"
      bordered
      :class="$q.dark.isActive ? 'bg-grey-9' : 'bg-grey-3'"
      side="left"
    >
      <q-scroll-area class="fit" :horizontal-thumb-style="{ opacity: '0' }">
        <q-list padding>
          <q-item clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="inbox" />
            </q-item-section>

            <q-item-section @click="expanded = !expanded">
              보유 일정
            </q-item-section>
          </q-item>
          <q-card flat bordered>
            <q-slide-transition>
              <div v-show="expanded">
                <q-separator />
                <q-card-section class="text-subitle2"> ddd </q-card-section>
              </div>
            </q-slide-transition>
          </q-card>

          <q-item active clickable v-ripple>
            <q-item-section avatar>
              <q-icon name="star" />
            </q-item-section>

            <q-item-section> 중요 일정함 </q-item-section>
          </q-item>
        </q-list>
      </q-scroll-area>

      <!--
          in this case, we use a button (can be anything)
          so that user can switch back
          to mini-mode
        -->
      <div class="q-mini-drawer-hide absolute" style="top: 15px; right: -17px">
        <q-btn
          dense
          round
          unelevated
          color="accent"
          icon="chevron_left"
          @click="miniState = true"
        />
      </div>
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <q-btn @click="viewCreateDialog = true"></q-btn>

      <div class="q-pa-lg">
        <div class="q-gutter-md">
          <div class="calendar q-pa-md">
            <div class="header">
              <q-icon
                name="arrow_back"
                class="q-mr-sm"
                @click="previousMonth"
              />
              <h2 class="q-my-none">{{ currentMonth }}</h2>
              <q-icon name="arrow_forward" class="q-ml-sm" @click="nextMonth" />
            </div>
            <div class="days">
              <div class="day" v-for="(day, index) in days" :key="index">
                {{ day }}
              </div>
            </div>
            <div class="dates">
              <div
                v-for="(date, index) in calendarDates"
                :key="index"
                class="date"
                :class="{ today: isToday(date) }"
              >
                {{ date }}
              </div>
            </div>
          </div>
        </div>
      </div>

      <q-dialog persistent v-model="viewCreateDialog">
        <calendar-create
      /></q-dialog>
    </q-page-container>
  </q-layout>
</template>

<style scoped>
.calendar {
  width: 1600px;
  max-width: 100%;
  margin: 0 auto;
  background-color: #f5f5f5;
  border-radius: 10px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  background-color: #e0e0e0;
  padding: 10px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.days {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.day {
  text-align: center;
  font-weight: bold;
  color: #888;
  padding: 10px;
  flex: 1;
}

.dates {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 5px;
  padding: 10px;
}

.date {
  padding: 10px;
  text-align: center;
  background-color: #fff;
  border-radius: 5px;
}

.today {
  background-color: #ff4081;
  color: #fff;
}
</style>
