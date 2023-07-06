<script lang="ts">
import { useQuasar } from 'quasar'
import { defineComponent, ref } from 'vue'
import { Form as ValidationForm, useForm, useField } from 'vee-validate'
import * as yup from 'yup'

export default defineComponent({
  components: { ValidationForm },
  props: {
    calenderId: Number,
  },
  setup(props) {
    console.log(props.calenderId)
    const $q = useQuasar()

    const validationSchema = yup.object({
      title: yup.string().defined().required('제목은 필수 정보입니다.'),
    })

    const { errors, meta, setFieldError, resetForm } = useForm({
      validationSchema,
      initialValues: {
        title: '',
      },
    })

    const createSchedule = () => {
      console.log(1)
    }

    const { value: title } = useField<string>('title', {
      validateOnInput: true,
    })

    const state = { title, errors }
    const action = { createSchedule }
    return {
      ...state,
      ...action,
    }
  },
})
</script>
<template>
  <q-card class="card-container">
    <q-card-section>
      <h2 class="text-h6">
        신규 일정 생성
        <q-btn rounded flat icon="close" v-close-popup style="float: right" />
      </h2>
    </q-card-section>

    <validation-form @submit="createSchedule">
      <q-card-section>
        <strong class="admin-input-label"
          >아이디 <span class="essential">*</span></strong
        >
        <q-input
          square
          outlined
          v-model="title"
          placeholder="회사 계정 입력"
          class="text-input-area mx-0 w-100"
          color="admin-gray1"
          no-error-icon
          :error="!!errors.title"
        >
          <template #error>{{ errors.title }} </template>
        </q-input>
      </q-card-section>

      <q-card-section>
        <q-btn
          rounded
          outline
          class="w-100"
          color="primary"
          type="submit"
          label="생성하기"
        />
      </q-card-section>
    </validation-form>
  </q-card>
</template>

<style scoped></style>
