<script lang="ts" setup="">
import { isNodeVisible } from "@/helper/isNodeParent";
import { defineProps } from "vue";
import ItemList, {
  type ItemListType,
} from "@/components/parts/RecursiveComponent/ItemList.vue";

export type GroupList = {
  children?: ItemListType[];
};

const groupListProps = defineProps<{ child?: any }>();
</script>

<template>
  <v-list-group
    v-if="
      groupListProps.child.children &&
      groupListProps.child.children?.length !== 0 &&
      isNodeVisible(groupListProps.child.children)
    "
    :value="groupListProps.child.path"
  >
    <template v-slot:activator="{ props }">
      <ItemList
        :path="groupListProps.child.path"
        :props="props"
        :title="groupListProps.child.label"
      />
    </template>

    <ItemList
      v-for="innerChild in groupListProps.child.children"
      :key="innerChild.label"
      :path="innerChild.path"
      :title="innerChild.label"
      :value="innerChild.path"
    />
  </v-list-group>
</template>

<style scoped></style>
