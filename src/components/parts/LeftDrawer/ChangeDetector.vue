<script lang="ts" setup="">
import { defineProps } from "vue";

const props = defineProps<{ loading: boolean }>();
</script>

<template>
  <v-card
    class="!flex flex-col justify-center items-center gap-2 py-2"
    elevation="0"
  >
    <v-btn :loading="props.loading" color="info" rounded="1"
      >اعمال تغییرات</v-btn
    >
    <v-btn color="warning" rounded="1">اعمال تنظیمات پیشفرض</v-btn>
  </v-card>
</template>

<style scoped></style>
