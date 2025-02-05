<script lang="ts" setup>
import { ref, provide } from "vue";
import { RouterLink, RouterView } from "vue-router";
import MainAppBar from "@/components/MainAppBar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import LeftDrawer from "@/components/LeftDrawer.vue";

const isDrawerOpen = ref(true);
const isLeftDrawerOpen = ref(true);

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const toggleLeftDrawer = () => {
  isLeftDrawerOpen.value = !isLeftDrawerOpen.value;
};
</script>

<template>
  <v-locale-provider rtl>
    <v-app class="py-4" full-height theme="green">
      <MainAppBar
        @toggleDrawer="toggleDrawer"
        @toggleLeftDrawer="toggleLeftDrawer"
      />
      <NavigationDrawer v-model="isDrawerOpen" />
      <LeftDrawer v-model="isLeftDrawerOpen" />

      <v-main>
        <v-container>
          <RouterView />
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>

<!--styles for syncfusion document editor-->
<style scoped></style>
