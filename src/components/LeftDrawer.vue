<script lang="ts" setup="">
import Logo from "@/assets/leftSidebar/Logo.avif";
import { reactive, ref, watch } from "vue";
import Select from "@/components/parts/LeftDrawer/Select.vue";
import Switch from "@/components/parts/LeftDrawer/Switch.vue";
import Divider from "@/components/parts/LeftDrawer/Divider.vue";
import Image from "@/components/parts/LeftDrawer/Image.vue";
import Bar from "@/components/parts/LeftDrawer/Bar.vue";
import { useUserSettings } from "@/stores/usersettings";

const userSettings = useUserSettings();

const isDrawerOpen = defineModel<boolean>();
const selects = reactive({
  template: {
    data: [
      { label: "سبز", value: "green" },
      { label: "قرمز", value: "red" },
      { label: "زرد", value: "yellow" },
      {
        label: "خاکستری",
        value: "gray",
      },
    ],
    selected: "green",
  },
  pagePerRow: {
    data: ["5", "10", "15", "همه"],
    selected: "5",
  },
});

const switches = reactive({
  animation: {
    selected: true,
  },
  showHelp: {
    selected: true,
  },
  showPersianNumbers: {
    selected: true,
  },
  applyChangesQuickly: {
    selected: true,
  },
});

watch(
  () => selects.template.selected,
  (value) => {
    userSettings.changeTheme(value);
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
              v-model="selects.template.selected"
              :items="selects.template.data"
              title="انتخاب قالب:"
            />
            <!--انیمیشن:-->
            <Switch v-model="switches.animation.selected" title="انیمیشن:" />
            <!--محتوا-->
            <Divider title="محتوا" />
            <!--تعداد لیست هر صفحه:-->
            <Select
              v-model="selects.pagePerRow.selected"
              :items="selects.pagePerRow.data"
              title="تعداد لیست هر صفحه:"
            />
            <!--نمایش راهنما:-->
            <Switch
              v-model="switches.showHelp.selected"
              title="نمایش راهنما:"
            />
            <!--نمایش اعداد به فارسی:-->
            <Switch
              v-model="switches.showPersianNumbers.selected"
              title="نمایش اعداد به فارسی:"
            />
            <!--تنظیمات-->
            <Divider title="تنظیمات" />
            <!--اعمال سریع تغییرات:-->
            <Switch
              v-model="switches.applyChangesQuickly.selected"
              title="اعمال سریع تغییرات:"
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
