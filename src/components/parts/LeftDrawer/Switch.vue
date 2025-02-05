<script lang="ts" setup="">
import { defineProps, defineModel } from "vue";

const props = defineProps<{ title: string }>();
const selected = defineModel<boolean>();
</script>

<template>
  <div class="flex justify-between align-center">
    <div class="flex gap-2 align-center">
      <v-icon class="text-green-500" icon="mdi-help-circle" size="20" />
      <div class="font-bold">{{ props.title }}</div>
    </div>
    <div>
      <v-switch v-model="selected" class="h-[57px]" color="green"></v-switch>
    </div>
  </div>
</template>

<style scoped></style>
