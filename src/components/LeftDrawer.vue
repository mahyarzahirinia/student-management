<script lang="ts" setup="">
import Logo from "@/assets/leftSidebar/Logo.avif";
import { onMounted, reactive, ref, watch } from "vue";
import Select from "@/components/parts/LeftDrawer/Select.vue";
import Switch from "@/components/parts/LeftDrawer/Switch.vue";
import Divider from "@/components/parts/LeftDrawer/Divider.vue";
import Image from "@/components/parts/LeftDrawer/Image.vue";
import Bar from "@/components/parts/LeftDrawer/Bar.vue";
import ChangeDetector from "@/components/parts/LeftDrawer/ChangeDetector.vue";
import { useUserSettings } from "@/stores/usersettings";
import _ from "lodash";
import { userSettingsInit } from "@/stores/usersettingsData";
import { state } from "sucrase/dist/types/parser/traverser/base";

const userSettingsStore = useUserSettings();

const isDrawerOpen = defineModel<boolean>();

const severedInitStateObject = JSON.parse(JSON.stringify(userSettingsStore));
const states = reactive({ ...severedInitStateObject });
const areStateStoreEqual = ref<boolean>(true);
const isChangedQuickly = ref<boolean>(true);

//
// watch(
//   () => states.switches.isPersianNumbers.selected,
//   (value) => {
//     if (states.switches.isChangesQuicklyApplied.selected)
//       userSettingsStore.changeIsPersianNumbers(value);
//   },
// );
//
// watch(
//   () => states.selects.itemsPerPage.selected,
//   (value) => {
//     if (states.switches.isChangesQuicklyApplied.selected)
//       userSettingsStore.changeItemsPerPage(value);
//   },
// );
//
// watch(
//   () => states.selects.template.selected,
//   (value) => {
//     if (states.switches.isChangesQuicklyApplied.selected)
//       userSettingsStore.changeTheme(value);
//   },
// );
//
// watch(
//   () => JSON.stringify(states) === JSON.stringify(userSettingsStore),
//   (value) => {
//     applyStates.areObjectsEqual = value;
//   },
// );

watch(
  () => JSON.stringify(states) === JSON.stringify(userSettingsStore),
  (value) => {
    areStateStoreEqual.value = value;
    if (isChangedQuickly.value)
      userSettingsStore.setStore(JSON.parse(JSON.stringify(states)));
    console.log("store:", userSettingsStore.selects.template.selected);
    console.log("states:", states.selects.template.selected);
    console.log("areObjectsEqual:", areStateStoreEqual.value);
    console.log("isChangedQuickly:", isChangedQuickly.value);
    console.log("--------------");
  },
);

const handleRevertChanges = () => {
  states.$state = userSettingsStore;
};

const handleApplyChanges = () => {
  userSettingsStore.setStore(states);
};
</script>

<template>
  <div>
    <v-navigation-drawer
      v-model="isDrawerOpen"
      :width="$vuetify.display.mobile ? 250 : 300"
      location="left"
      permanent
      temporary
    >
      <v-layout>
        <div class="flex flex-col w-full bg-surface">
          <!--تنظیمات کاربری-->
          <Bar v-model="isDrawerOpen" />
          <div class="flex flex-col p-4">
            <!--عکس-->
            <Image :src="Logo" />
            <!--ظاهر-->
            <Divider title="ظاهر" />
            <!--انتخاب قالب:-->
            <Select
              v-model="states.selects.template.selected"
              :items="states.selects.template.data"
              title="انتخاب قالب:"
            />
            <!--انیمیشن:-->
            <Switch
              v-model="states.switches.animation.selected"
              title="انیمیشن:"
            />
            <!--محتوا-->
            <Divider title="محتوا" />
            <!--تعداد لیست هر صفحه:-->
            <Select
              v-model="states.selects.itemsPerPage.selected"
              :items="states.selects.itemsPerPage.data"
              title="تعداد لیست هر صفحه:"
            />
            <!--نمایش راهنما:-->
            <Switch
              v-model="states.switches.isHelp.selected"
              title="نمایش راهنما:"
            />
            <!--نمایش اعداد به فارسی:-->
            <Switch
              v-model="states.switches.isPersianNumbers.selected"
              title="نمایش اعداد به فارسی:"
            />
            <!--تنظیمات-->
            <Divider title="تنظیمات" />
            <!--اعمال سریع تغییرات:-->
            <Switch v-model="isChangedQuickly" title="اعمال سریع تغییرات:" />
            <ChangeDetector
              :should-operate="areStateStoreEqual"
              @revert-changes="handleRevertChanges"
              @apply-changes="handleApplyChanges"
            />
          </div>
        </div>
      </v-layout>
    </v-navigation-drawer>
  </div>
</template>

<style scoped>
.toggle-pin {
  transition: transform 0.2s;
  transform: rotate(30deg);
}
</style>
