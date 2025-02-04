<script lang="ts" setup="">
import { defineProps } from "vue";
import { type RouteRecordRaw } from "vue-router";
import { isNodeParent } from "@/helper/isNodeParent";
import { type Node } from "@/routes/mainRoutes";

const props = defineProps<{ node: Node }>();
// const groupProps = props?.children?.length !== 0 ? props?.children : null;
</script>

<template>
  <template v-if="isNodeParent(props.node.children)">
    <v-list-group>
      <template v-slot:activator="{ props }">
        <v-list-item :title="props.node.label" v-bind="props"></v-list-item>
      </template>
      <template v-for="child in props.node.children">
        <v-list-item :title="child.label"></v-list-item>
      </template>
    </v-list-group>
    <RecursiveComponent :node="props.node.children"></RecursiveComponent>
  </template>
  <!--  <template v-if="node?.label">{{ node?.label }}</template>-->
</template>

<style scoped></style>
