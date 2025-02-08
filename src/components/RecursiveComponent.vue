<script lang="ts" setup>
import { defineProps } from "vue";
import { type Node } from "@/routes/mainRoutes";
import { isNodeParent, isNodeVisible } from "@/helper/isNodeParent";
import ItemList from "@/components/parts/RecursiveComponent/ItemList.vue";

const compProps = defineProps<{ node: Node }>();
</script>

<template>
  <template
    v-if="isNodeParent(compProps.node) && isNodeVisible(compProps.node)"
  >
    <v-list-item :title="compProps.node?.label" :to="compProps.node.path">
      <template v-slot:prepend>
        <v-icon :icon="compProps.node?.icon" class="text-primary" />
      </template>
    </v-list-item>
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
          <v-list-item
            :title="child?.label"
            :to="child.path"
            :value="child.path"
          >
            <template v-slot:prepend>
              <v-icon :icon="child?.icon" class="text-primary" />
            </template>
          </v-list-item>
        </template>

        <v-list-group
          v-if="
            child.children &&
            child.children?.length !== 0 &&
            isNodeVisible(child.children)
          "
          :value="child.path"
        >
          <template v-slot:activator="{ props }">
            <v-list-item
              :title="child.label"
              :to="child.path"
              v-bind="props"
            ></v-list-item>
          </template>
          <v-list-item
            v-for="innerChild in child.children"
            :key="innerChild.label"
            :title="innerChild.label"
            :to="innerChild.path"
            :value="innerChild.path"
          >
          </v-list-item>
        </v-list-group>
      </template>
    </v-list-group>
  </template>
</template>
