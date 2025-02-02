<script lang="ts" setup="">
import { ref } from "vue";
import links from "@/routes/mainLinks";

const isDrawerOpen = defineModel<boolean>();
const isPermanent = ref(false);
const allLinks = ref(links);

const handleOpenPermanent = () => {
  isPermanent.value = !isPermanent.value;
};
</script>

<template>
  <div>
    <v-navigation-drawer
      v-model="isDrawerOpen"
      :permanent="isPermanent"
      :rail="!isPermanent"
      expand-on-hover
    >
      <v-layout>
        <div class="flex flex-col flex-grow-1">
          <v-icon
            :class="[
              'm-4',
              'text-gray-500',
              'cursor-pointer',
              { 'toggle-pin text-red-800': isPermanent },
            ]"
            icon="mdi-pin"
            @click="handleOpenPermanent"
          />
          <v-list-item
            v-for="link in allLinks"
            :key="link.path"
            :to="link.path"
          >
            <template v-slot:prepend>
              <v-icon v-if="typeof link.icon === 'string'"
                >{{ link.icon }}
              </v-icon>
            </template>
            <v-list-item-title>{{ link.label }}</v-list-item-title>
          </v-list-item>
        </div>
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
