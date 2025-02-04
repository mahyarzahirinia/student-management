<script lang="ts" setup="">
import { computed, defineComponent, ref } from "vue";
import routes, { type Node } from "@/routes/mainRoutes";
import RecursiveComponent from "@/components/RecursiveComponent.vue";
import { isNodeParent } from "@/helper/isNodeParent";

const isDrawerOpen = defineModel<boolean>();
const isPermanent = ref(false);
const allNodes = ref<Node[]>(routes);

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
      <v-list>
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
          <v-list-item v-if="node?.visibility !== 'hidden'" :to="node.path">
            <template v-slot:default>
              <div v-if="isNodeParent(node)">
                <RecursiveComponent :node="node" />
              </div>
              <div v-else>
                <v-list-item-title>{{ node?.label }}</v-list-item-title>
              </div>
            </template>

            <template v-slot:prepend>
              <v-icon v-if="node?.icon && typeof node?.icon === 'string'">
                {{ node.icon }}
              </v-icon>
            </template>
          </v-list-item>
        </template>

        <!--        <v-list>-->
        <!--          <v-list-group value="submenu">-->
        <!--            <template v-slot:activator="{ props }">-->
        <!--              <v-list-item title="submenu" v-bind="props"></v-list-item>-->
        <!--            </template>-->
        <!--            <v-list-item title="sub1"></v-list-item>-->
        <!--            <v-list-item title="sub2"></v-list-item>-->
        <!--            <v-list-item title="sub3"></v-list-item>-->
        <!--          </v-list-group>-->
        <!--        </v-list>-->
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
