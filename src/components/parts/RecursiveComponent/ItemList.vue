<script lang="ts" setup="">
import { defineProps } from "vue";

export type ItemListType = {
  label?: string;
  path: string;
  icon?: string;
  props?: any;
  value?: any;
  children?: any;
};

const props = defineProps<ItemListType>();
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
