<template>
  <!-- if the node is visible -->
  <template v-if="isNodeVisible(node)">
    <!-- if the node has children, use group list -->
    <v-list-group
      v-if="node.children && node.children.length"
      :value="node.path"
    >
      <template v-slot:activator="{ props }">
        <ItemList
          :icon="node.icon"
          :label="node.label"
          :path="node.path"
          v-bind="props"
        />
      </template>

      <!-- recursive call for children -->
      <RecursiveComponent
        v-for="child in node.children"
        :key="child.path"
        :node="child"
      />
    </v-list-group>

    <!-- if no children, then show a item list-->
    <ItemList v-else :icon="node.icon" :label="node.label" :path="node.path" />
  </template>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
import { isNodeVisible } from "@/helper/isNodeParent";
import ItemList from "@/components/parts/RecursiveComponent/ItemList.vue";

defineProps<{ node: any }>();
</script>
