<script lang="ts" setup="">
import { defineProps, defineEmits } from "vue";

const props = defineProps<{ shouldOperate: boolean }>();
const emits = defineEmits(["revertChanges", "applyChanges"]);
</script>

<template>
  <v-card
    class="!flex flex-col justify-center items-center gap-2 py-2"
    elevation="0"
  >
    <v-btn
      :disabled="props.shouldOperate"
      color="info"
      rounded="1"
      @click="emits('applyChanges')"
      >اعمال تغییرات
    </v-btn>
    <v-btn
      v-show="!props.shouldOperate"
      color="warning"
      rounded="1"
      @click="emits('revertChanges')"
      >اعمال تنظیمات پیشفرض
    </v-btn>
  </v-card>
</template>

<style scoped></style>
