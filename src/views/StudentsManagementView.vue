<script lang="ts" setup>
import { nextTick, reactive, ref, onMounted, inject } from "vue";
import { useStudentsStore } from "@/stores/students";
import { type Student } from "@/stores/data";
import CreateEditDialog from "@/views/dialogs/studentManagement/CreateEditDialog.vue";
import RemoveDialog from "@/views/dialogs/studentManagement/RemoveDialog.vue";
import moment from "jalali-moment";
import Print from "@/components/facilitator/Print.vue";
import { useDebounce } from "@vueuse/core";
import { useUserSettings } from "@/stores/usersettings";

const studentsStore = useStudentsStore();
const students = studentsStore.students;
const userSettingsStore = useUserSettings();

const search = ref("");
const printArea = ref(null);
const selected = ref([]);
const isDialogOpen = ref(false);
const isCreateEditDialogOpen = ref(false);
const editingStudentIndex = ref<number | null>(null);
const studentIdRef = ref<string>("");

const printObj = reactive({
  id: "printArea",
  popTitle: "good print",
  // extraCss:
  //   "https://www.google.com/css/css1.css, https://www.google.com/css/css2.css",
  extraHead: '<meta http-equiv="Content-Language" content="fa-IR"/>',
  //
  // beforeOpenCallback(vue) {
  //   vue.printLoading = true;
  //   console.log("打开之前");
  // },
  // openCallback(vue) {
  //   vue.printLoading = false;
  //   console.log("执行了打印");
  // },
  // closeCallback(vue) {
  //   console.log("关闭了打印工具");
  // },
});

const headers = ref([
  { key: "id", title: "ردیف" },
  { key: "fullName", title: "نام و نام خانوادگی" },
  { key: "studentId", title: "شماره دانشجویی" },
  { key: "email", title: "ایمیل" },
  { key: "activeStatus", title: "فعال" },
  { key: "birthDate", title: "تاریخ تولد" },
  { key: "operations", title: "عملیات" },
]);

// end of the refs

const handleCloseDialog = () => {
  isDialogOpen.value = false;
};

const handleCloseCreateEditDialog = () => {
  isCreateEditDialogOpen.value = false;
  editingStudentIndex.value = null;
};

const handleRemove = (id: string) => {
  studentsStore.remove(studentIdRef.value);
  isDialogOpen.value = false;
};

const handleFormSubmit = (val: Student) => {
  if (editingStudentIndex.value !== null) {
    console.log("Editing student at index:", editingStudentIndex.value);
    studentsStore.edit(val);
  } else {
    // find the latest ID
    const latestId = students.reduce(
      (max, student) => Math.max(max, student.id),
      0,
    );
    // creating new student
    debugger;
    const newStudent: Student = {
      ...val,
      id: latestId + 1,
    };
    studentsStore.add(newStudent);
  }
  handleCloseCreateEditDialog();
};

const openEditDialog = (index: number) => {
  editingStudentIndex.value = index;
  isCreateEditDialogOpen.value = true;
};

const openRemoveDialog = (index: number) => {
  studentIdRef.value = students[index].studentId;
  isDialogOpen.value = true;
};

const debouncedSearch = useDebounce(search, 2000);

const dummyProps = reactive({
  data: [...students],
  itemProps: [
    ...headers.value
      .filter((header) => header.key !== "id")
      .filter((header) => header.key !== "operations")
      .map((header) => ({
        label: header.title,
        prop: header.key,
        type: "string",
      })),
  ],
  title: "Sample Data Table",
  btnTitle: "Print Table",
  btnTooltip: "Click to print the table",
  btnColor: "blue",
  showRowNumber: true,
  printSettings: {
    paperSize: "A4",
    orientation: "portrait",
    margins: {
      top: ".5cm",
      bottom: ".5cm",
      left: ".5cm",
      right: ".5cm",
    },
    scaling: "100%",
    header: {
      show: true,
      content: "<h2>Report Title</h2>",
    },
    footer: {
      show: true,
      content: '<span class="page-number">صفحه: </span>',
    },
    showRowNumbers: true,
    font: {
      size: "12px",
      family: "vazir-medium, sans-serif",
    },
    pagination: {
      enabled: true,
      rowsPerPage: 5,
    },
  },
});
</script>

<template>
  <v-card flat title="مدیریت دانشجو">
    <template v-slot:text>
      <div class="flex flex-col">
        <v-text-field
          :modelValue="debouncedSearch"
          label="جستجو"
          placeholder="در هر فیلدی جست و جو کنید"
          prepend-inner-icon="mdi-magnify"
          single-line
          variant="outlined"
        ></v-text-field>
      </div>

      <RemoveDialog
        v-model:isModalOpen="isDialogOpen"
        :index="editingStudentIndex"
        @handleClose="handleCloseDialog"
        @handleConfirm="handleRemove"
      >
        <template v-slot:activator="props"></template>
      </RemoveDialog>

      <CreateEditDialog
        v-model:isCreateEditModalOpen="isCreateEditDialogOpen"
        :student="
          editingStudentIndex !== null ? students[editingStudentIndex] : null
        "
        @handleClose="handleCloseCreateEditDialog"
        @handleSubmit="handleFormSubmit"
      >
        <template v-slot:activator="props"></template>
      </CreateEditDialog>
      <div class="flex items-center">
        <v-btn
          color="primary"
          prepend-icon="mdi-plus"
          variant="flat"
          @click="isCreateEditDialogOpen = true"
          >ایجاد دانشجو
        </v-btn>
        <Print v-bind="dummyProps" />
        <v-btn
          color="primary"
          prepend-icon="mdi-lock-reset"
          variant="flat"
          @click="studentsStore.reset"
          >ریست دیتا
        </v-btn>
      </div>
    </template>

    <div>
      <v-data-table
        v-model="selected"
        :headers="headers"
        :items="students"
        :items-per-page="userSettingsStore.currentItemsPerPage"
        :search="search"
        show-select
      >
        <template v-slot:item.operations="{ index, item }">
          <div class="flex flex-row">
            <v-btn
              color="info"
              icon="mdi-account-edit"
              variant="text"
              @click="openEditDialog(item.id)"
            ></v-btn>

            <v-btn
              color="red-lighten-2"
              icon="mdi-delete"
              variant="text"
              @click="openRemoveDialog(item.id)"
            ></v-btn>
          </div>
        </template>

        <template v-slot:item.activeStatus="{ item }">
          <v-checkbox v-model="item.active" class="pt-4" disabled></v-checkbox>
        </template>
        <template v-slot:item.birthDate="{ item }">
          <div>
            {{ moment(item.birthDate).locale("fa").format("YYYY/MM/DD") }}
          </div>
        </template>
      </v-data-table>
    </div>
    <div>
      <!--      <EjsDocumenteditorcontainer-->
      <!--        :enableToolbar="true"-->
      <!--        :serviceUrl="serviceUrl"-->
      <!--      ></EjsDocumenteditorcontainer>-->
    </div>
  </v-card>
</template>
