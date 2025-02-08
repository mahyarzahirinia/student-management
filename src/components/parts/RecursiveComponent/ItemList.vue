<script lang="ts" setup="">
import { defineProps } from "vue";

const props = defineProps<{
  label?: string;
  path: string;
  icon?: string;
  props?: any;
  value?: any;
}>();
</script>

<template>
  <v-list-item
    :title="props.label"
    :to="props.path"
    :value="props.value"
    v-bind="props.props"
  >
    <template v-slot:prepend>
      <v-icon :icon="props?.icon" class="text-primary" />
    </template>
  </v-list-item>
</template>

<style scoped></style>
