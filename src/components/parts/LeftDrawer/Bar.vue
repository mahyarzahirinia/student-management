<script lang="ts" setup="">
import { defineModel } from "vue";

const isDrawerOpen = defineModel<boolean>();
</script>

<template>
  <v-card class="border-b-2 py-2 px-3" rounded="0">
    <template v-slot:title>
      <div class="font-bold text-primary text-sm">تنظیمات کاربری</div>
    </template>
    <template v-slot:append>
      <v-icon
        class="rounded-sm px-2 py-1 cursor-pointer bg-secondary"
        icon="mdi-close"
        size="18"
        @click="isDrawerOpen = !isDrawerOpen"
      />
    </template>
  </v-card>
</template>

<style scoped></style>
