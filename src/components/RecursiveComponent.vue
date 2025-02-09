<script lang="ts" setup>
import { defineProps } from "vue";
import { type Node } from "@/routes/mainRoutes";
import { isNodeParent, isNodeVisible } from "@/helper/isNodeParent";
import ItemList from "@/components/parts/RecursiveComponent/ItemList.vue";
import GroupList from "@/components/parts/RecursiveComponent/GroupList.vue";

const compProps = defineProps<{ node: Node }>();
</script>

<template>
  <template
    v-if="isNodeParent(compProps.node) && isNodeVisible(compProps.node)"
  >
    <ItemList
      :icon="compProps.node?.icon"
      :path="compProps.node.path"
      :title="compProps.node?.label"
    />
  </template>

  <template v-else-if="isNodeVisible(compProps.node)">
    <v-list-group :value="compProps.node.path">
      <template v-slot:activator="{ props }">
        <ItemList
          :icon="compProps.node.icon"
          :label="compProps.node.label"
          :path="compProps.node.path"
          :props="props"
        />
      </template>

      <template v-for="child in compProps.node?.children" :key="child.path">
        <template v-if="!child.children">
          <ItemList
            :icon="child?.icon"
            :label="child?.label"
            :path="child.path"
            :value="child.path"
          />
        </template>

        <GroupList :child="child" />
      </template>
    </v-list-group>
  </template>
</template>
