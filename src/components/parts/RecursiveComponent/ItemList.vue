<template>
  <v-list-item :title="label" :to="path" :value="value" v-bind="props">
    <template v-slot:prepend>
      <v-icon v-if="icon" :icon="icon" class="text-primary" />
    </template>
  </v-list-item>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";

defineProps<{
  label?: string;
  path: string;
  icon?: string;
  props?: any;
  value?: any;
}>();
</script>
