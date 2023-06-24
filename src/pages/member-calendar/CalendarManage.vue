<script lang="ts">
import { ref, defineComponent } from 'vue'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import { useQuasar } from 'quasar'

export default defineComponent({
  components: {
    FullCalendar,
  },
  setup() {
    const leftDrawerOpen = ref(false)
    const rightDrawerOpen = ref(false)
    const $q = useQuasar()

    const currentEvents = ref([])
    const calendarOptions = ref({
      plugins: [
        dayGridPlugin,
        timeGridPlugin,
        interactionPlugin, // needed for dateClick
      ],
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: 'dayGridMonth,timeGridWeek,timeGridDay',
      },
      initialView: 'dayGridMonth',
      initialEvents: INITIAL_EVENTS, // alternatively, use the `events` setting to fetch from a feed
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true,
      weekends: true,
      select: handleDateSelect,
      eventClick: handleEventClick,
      eventsSet: handleEvents,
      /* you can update a remote database when these fire:
      eventAdd:
      eventChange:
      eventRemove:
      */
    })
    function handleWeekendsToggle() {
      calendarOptions.value.weekends = !calendarOptions.value.weekends // update a property
    }

    function handleDateSelect(selectInfo: any) {
      $q.dialog({
        title: '알림',
        message: '추가하시겠습니까?',
      })
      let title = 'test'
      let calendarApi = selectInfo.view.calendar

      calendarApi.unselect() // clear date selection

      if (title) {
        calendarApi.addEvent({
          id: createEventId(),
          title,
          start: selectInfo.startStr,
          end: selectInfo.endStr,
          allDay: selectInfo.allDay,
        })
      }
    }

    function handleEventClick(clickInfo: any) {
      if (
        confirm(
          `Are you sure you want to delete the event '${clickInfo.event.title}'`
        )
      ) {
        clickInfo.event.remove()
      }
    }

    function handleEvents(events: any) {
      currentEvents.value = events
    }

    const toggleLeftDrawer = () => {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    const toggleRightDrawer = () => {
      rightDrawerOpen.value = !rightDrawerOpen.value
    }

    const state = {
      leftDrawerOpen,
      rightDrawerOpen,
      calendarOptions,
      currentEvents,
    }
    const action = {
      toggleLeftDrawer,
      toggleRightDrawer,
      handleWeekendsToggle,
      handleDateSelect,
      handleEventClick,
      handleEvents,
    }
    return {
      ...state,
      ...action,
    }
  },
})
</script>

<template>
  <q-layout view="hHr LpR fFf">
    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <q-btn dense flat round icon="menu" @click="toggleLeftDrawer" />

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg" />
          </q-avatar>
          Title
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/page1" label="Page One" />
        <q-route-tab to="/page2" label="Page Two" />
        <q-route-tab to="/page3" label="Page Three" />
      </q-tabs>
    </q-header>

    <q-drawer show-if-above v-model="leftDrawerOpen" side="left" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>

    <q-page-container>
      <FullCalendar :options="calendarOptions">
        <template v-slot:eventContent="arg">
          <b>{{ arg.timeText }}</b>
          <i>{{ arg.event.title }}</i>
        </template>
      </FullCalendar>
    </q-page-container>
  </q-layout>
</template>
