<script lang="ts" setup>
const emit = defineEmits(["toggleDrawer", "toggleLeftDrawer"]);
</script>

<template>
  <v-app-bar color="primary" density="compact">
    <template v-slot:prepend>
      <v-app-bar-nav-icon @click="emit('toggleDrawer')"></v-app-bar-nav-icon>
    </template>

    <v-app-bar-title>پیوند ها</v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-dots-vertical" @click="emit('toggleLeftDrawer')"></v-btn>
    </template>
  </v-app-bar>
</template>

<style scoped></style>
