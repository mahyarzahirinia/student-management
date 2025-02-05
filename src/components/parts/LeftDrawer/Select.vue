<script lang="ts" setup="">
import { defineProps, defineModel } from "vue";

const props = defineProps<{ title: string; items: any[] }>();
const selected = defineModel<string>();
</script>

<template>
  <div class="flex justify-between align-center">
    <div class="flex gap-2 align-center">
      <v-icon class="text-primary" icon="mdi-help-circle" size="20" />
      <div class="font-bold">{{ props.title }}</div>
    </div>
    <div>
      <v-select
        v-model="selected"
        :items="props.items"
        class="border-b-0"
        density="compact"
        item-title="label"
        item-value="value"
        variant="outlined"
      >
        <v-list-item>test</v-list-item>
        <v-list-item>test2</v-list-item>
      </v-select>
    </div>
  </div>
</template>

<style scoped>
:deep(.v-input__details) {
  @apply min-h-0;
  @apply pt-0;
}
</style>
