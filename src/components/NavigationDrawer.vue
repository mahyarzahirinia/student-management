<script lang="ts" setup="">
import { computed, defineComponent, ref } from "vue";
import routes, { type Node } from "@/routes/mainRoutes";
import RecursiveComponent from "@/components/RecursiveComponent.vue";
import { isNodeParent } from "@/helper/isNodeParent";

const isDrawerOpen = defineModel<boolean>();
const isPermanent = ref(true);
const allNodes = ref<Node[]>(routes);
const expanded = ref(["/students-management"]);

const handleOpenPermanent = () => {
  isPermanent.value = !isPermanent.value;
};

// const filteredList = computed(() =>
//   allLinks.value.filter((item) => item.visibility !== "hidden"),
// );
</script>

<template>
  <div>
    <v-navigation-drawer
      v-model="isDrawerOpen"
      :location="$vuetify.display.mobile ? 'right' : undefined"
      :permanent="isPermanent"
      :rail="!isPermanent"
      expand-on-hover
    >
      <v-list v-model:opened="expanded">
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
        <!--          pin-->
        <template v-for="node in allNodes" :key="node.path">
          <RecursiveComponent :node="node" />
        </template>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<style scoped>
.toggle-pin {
  transition: transform 0.2s;
  transform: rotate(30deg);
}
</style>
