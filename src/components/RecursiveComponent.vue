<script lang="ts" setup>
import { defineProps } from "vue";
import { type Node } from "@/routes/mainRoutes";
import { isNodeParent } from "@/helper/isNodeParent";

const props = defineProps<{ node: Node }>();
</script>

<template>
  <template v-if="isNodeParent(props.node)">
    <v-list-group>
      <template v-slot:activator="{ props: activatorProps }">
        <v-list-item
          :title="props.node.label"
          v-bind="activatorProps"
        ></v-list-item>
      </template>

      <template v-for="child in props.node.children" :key="child.path">
        <RecursiveComponent :node="child" />
      </template>
    </v-list-group>
  </template>
  <template v-else>
    <v-list-item :title="props.node.label"></v-list-item>
  </template>
</template>
