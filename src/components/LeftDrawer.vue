<script lang="ts" setup="">
import { ref } from "vue";

const isDrawerOpen = defineModel<boolean>();
</script>

<template>
  <div>
    <v-navigation-drawer v-model="isDrawerOpen" location="left" temporary>
      <v-layout>
        <div class="flex flex-col flex-grow-1">test</div>
      </v-layout>
    </v-navigation-drawer>
  </div>
</template>

<style scoped>
.toggle-pin {
  transition: transform 0.2s;
  transform: rotate(30deg);
}
</style>
