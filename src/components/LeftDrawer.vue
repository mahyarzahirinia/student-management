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

const userSettingsStore = useUserSettings();

const isDrawerOpen = defineModel<boolean>();

const states = reactive(userSettingsInit);

watch(
  () => userSettingsStore.switches.isPersianNumbers.selected,
  (value) => {
    if (userSettingsStore.switches.isChangesQuicklyApplied.selected)
      userSettingsStore.changeIsPersianNumbers(value);
  },
);

watch(
  () => userSettingsStore.selects.itemsPerPage.selected,
  (value) => {
    if (userSettingsStore.switches.isChangesQuicklyApplied.selected)
      userSettingsStore.changeItemsPerPage(value);
  },
);

watch(
  () => userSettingsStore.selects.template.selected,
  (value) => {
    if (userSettingsStore.switches.isChangesQuicklyApplied.selected)
      userSettingsStore.changeTheme(value);
  },
);
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
              v-model="userSettingsStore.selects.template.selected"
              :items="userSettingsStore.selects.template.data"
              title="انتخاب قالب:"
            />
            <!--انیمیشن:-->
            <Switch
              v-model="userSettingsStore.switches.animation.selected"
              title="انیمیشن:"
            />
            <!--محتوا-->
            <Divider title="محتوا" />
            <!--تعداد لیست هر صفحه:-->
            <Select
              v-model="userSettingsStore.selects.itemsPerPage.selected"
              :items="userSettingsStore.selects.itemsPerPage.data"
              title="تعداد لیست هر صفحه:"
            />
            <!--نمایش راهنما:-->
            <Switch
              v-model="userSettingsStore.switches.isHelp.selected"
              title="نمایش راهنما:"
            />
            <!--نمایش اعداد به فارسی:-->
            <Switch
              v-model="userSettingsStore.switches.isPersianNumbers.selected"
              title="نمایش اعداد به فارسی:"
            />
            <!--تنظیمات-->
            <Divider title="تنظیمات" />
            <!--اعمال سریع تغییرات:-->
            <Switch
              v-model="
                userSettingsStore.switches.isChangesQuicklyApplied.selected
              "
              title="اعمال سریع تغییرات:"
            />
            <ChangeDetector />
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
