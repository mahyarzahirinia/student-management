<script lang="ts" setup="">
import { defineProps } from "vue";

const props = defineProps<{ src: string }>();
</script>

<template>
  <div class="flex justify-center m-4">
    <v-img
      :class="[{ '!hidden': $vuetify.display.mobile }]"
      :src="props.src"
      aspect-ratio="1/1"
      cover
    />
  </div>
</template>

<style scoped></style>
