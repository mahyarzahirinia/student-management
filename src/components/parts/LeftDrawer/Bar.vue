<script lang="ts" setup="">
import { defineModel } from "vue";

const isDrawerOpen = defineModel<boolean>();
</script>

<template>
  <div class="border-b-2 bg-green-100 p-2 pt-3">
    <div class="flex justify-between">
      <div class="font-bold text-green-600">تنظیمات کاربری</div>
      <div>
        <v-icon
          class="rounded-sm p-1 bg-green-300 text-green-700 cursor-pointer"
          icon="mdi-close"
          size="18"
          @click="isDrawerOpen = !isDrawerOpen"
        ></v-icon>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
