<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import Vue3PersianDatetimePicker from "vue3-persian-datetime-picker";
import { useForm, useField } from "vee-validate";
import * as yup from "yup";
import { type Student } from "@/stores/data";
import { boolean } from "yup";
import moment from "moment";
import "moment/locale/fa";
import { convertDigits } from "persian-helpers";

const isCreateEditModalOpen = defineModel<boolean>("isCreateEditModalOpen");
const props = defineProps<{ student: Student | null }>();
const emit = defineEmits(["handleSubmit", "handleClose"]);

const validationSchema = yup.object({
  fullName: yup.string().required("نام و نام خانوادگی الزامی است"),
  studentId: yup
    .string()
    .matches(/^\d+$/, "لطفا شماره وارد کنید")
    .transform((value, originalValue) =>
      convertDigits(originalValue, { to: "en" }),
    )
    .required("شماره دانشجویی الزامی است"),
  email: yup.string().email("ایمیل نامعتبر است").required("ایمیل الزامی است"),
  active: yup.boolean().required("حالت فعال/غیرفعال بودن باید مشخص شود"),
  birthDate: yup.string().required("تاریخ تولد الزامی است"),
});

const { handleSubmit, resetForm } = useForm({
  validationSchema,
});

const { value: fullName, errorMessage: fullNameError } = useField("fullName");
const { value: studentId, errorMessage: studentIdError } =
  useField("studentId");
const { value: email, errorMessage: emailError } = useField("email");
const { value: active, errorMessage: activeError } = useField("active");
const { value: birthDate, errorMessage: birthDateError } =
  useField("birthDate");

// watch for changes in the `student` prop
watch(
  () => props.student,
  (newStudent) => {
    if (newStudent) {
      resetForm({ values: newStudent });
    } else {
      resetForm({
        values: {
          fullName: null,
          studentId: null,
          email: null,
          active: null,
          birthDate: null,
        },
      });
    }
  },
  { immediate: true },
);

watch(
  () => isCreateEditModalOpen,
  () => {
    resetForm({
      values: {
        fullName: null,
        studentId: null,
        email: null,
        active: null,
        birthDate: null,
      },
    });
  },
);

const onDateChange = (date: string) => {
  if (!date) return;
  const parsedDate = moment(date, "jYYYY/jMM/jDD", "fa");
  birthDate.value = parsedDate.locale("en").format("YYYY-MM-DD");
};

const onSubmit = handleSubmit((values) => {
  emit("handleSubmit", values);
});

const activeIndeterminate = computed(() => active.value === null);
</script>

<template>
  <v-dialog v-model="isCreateEditModalOpen" max-width="600">
    <template v-slot:activator="{ props: activatorProps }">
      <slot name="activator" v-bind="activatorProps"></slot>
    </template>

    <v-card>
      <v-card-title>
        {{ props.student ? "ویرایش دانشجو" : "ایجاد دانشجو" }}
      </v-card-title>

      <v-card-text>
        <form @submit="onSubmit">
          <v-text-field
            v-model="fullName"
            :color="fullNameError ? 'error' : ''"
            :error-messages="fullNameError"
            label="نام و نام خانوادگی"
          ></v-text-field>

          <v-text-field
            v-model="studentId"
            :color="studentIdError ? 'error' : ''"
            :error-messages="studentIdError"
            label="شماره دانشجویی"
          ></v-text-field>

          <v-text-field
            v-model="email"
            :color="emailError ? 'error' : ''"
            :error-messages="emailError"
            label="ایمیل"
          ></v-text-field>

          <v-checkbox
            v-model="active"
            :color="activeError ? 'error' : ''"
            :error-messages="activeError"
            :indeterminate="activeIndeterminate"
            label="فعال"
          ></v-checkbox>

          <Vue3PersianDatetimePicker
            v-model="birthDate"
            :color="birthDateError ? 'red' : '#aaa'"
            label="تاریخ تولد"
            @change="onDateChange"
          >
          </Vue3PersianDatetimePicker>
          <p class="text-red-500 text-xs pr-4 pt-1">{{ birthDateError }}</p>

          <div class="flex justify-end gap-2 mt-4">
            <v-btn color="grey" @click="emit('handleClose')">انصراف</v-btn>
            <v-btn color="blue" type="submit">ذخیره</v-btn>
          </div>
        </form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
