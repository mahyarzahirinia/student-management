<script lang="ts" setup="">
import { defineProps } from "vue";

const props = defineProps<{ title: string }>();
</script>

<template>
  <v-container>
    <v-divider :opacity="5" :thickness="2">
      <div class="text-green-800 font-bold">{{ props.title }}</div>
    </v-divider>
  </v-container>
</template>

<style scoped></style>
