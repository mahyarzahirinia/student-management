<script setup>
import { reactive, ref, watch } from "vue";
// import UserSetting from "@/contracts/configs/user-setting";
// import { convertToJalali, convertToMiladi } from "@/services/tools/date-tools";
// import { filterNumbersWithSep } from "@/services/tools/filter-numbers";
// import { applyPersianNumbers } from "@/services/user-setting/number-display-service";

// سرویس‌های مربوط به API و مدیریت خطا و ...
// import mainApiService from "@/services/api/main-api";
// import errorProcessor from "@/services/tools/error-processor";
// import { convertDataToQueryString } from "@/services/tools/api-tools";
// import AuthService from "@/services/auth/auth-service";
// import { useToast } from "vue-toastification";

// const toast = useToast();

/**
 * پراپ‌های کامپوننت
 */
const props = defineProps({
  data: {
    type: Array,
    required: false,
    default: () => [],
  },
  itemProps: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: "جدول داده‌ها",
  },
  btnTitle: {
    type: String,
    default: "چاپ جدول",
  },
  btnTooltip: {
    type: String,
    default: "",
  },
  btnColor: {
    type: String,
    default: "green",
  },
  showRowNumber: {
    type: Boolean,
    default: true,
  },
  // پراپ‌های جدید برای مدیریت دریافت دیتا از سرور
  // apiPath: {
  //   type: String,
  //   default: "",
  // },
  // queryString: {
  //   type: Object,
  //   default: () => ({}),
  // },
  // apiMethod: {
  //   type: String,
  //   default: "get",
  // },
  // hasDownloadFile: {
  //   type: Boolean,
  //   default: false,
  // },
  // پراپ جدید برای تنظیمات چاپ
  printSettings: {
    type: Object,
    default: () => ({
      paperSize: "A4", // اندازه کاغذ
      orientation: "portrait", // جهت صفحه
      margins: {
        top: ".5cm",
        bottom: ".5cm",
        left: ".5cm",
        right: ".5cm",
      }, // حاشیه‌ها
      scaling: "100%", // مقیاس
      header: {
        show: false,
        content: "<h2>عنوان گزارش</h2>",
      }, // سربرگ
      footer: {
        show: false,
        content: '<span class="page-number"></span>',
      }, // پاصفحه
      showRowNumbers: true, // نمایش شماره ردیف‌ها
      font: {
        size: "12px",
        family: "IRANYekanX, Arial, sans-serif",
      }, // سایز و سبک فونت
      pagination: {
        enabled: false,
        rowsPerPage: 50,
      }, // صفحه بندی
    }),
  },
});

/**
 * استیت محلی
 */
const state = reactive({
  isPrinting: false,
  mainData: [], // زمانی که از سرور دریافت کنیم اینجا ذخیره می‌شود
});

/**
 * رفرنسی به div مخفی برای اسلات هدر
 */
const headerRef = ref(null);

/**
 * تنظیم اعداد فارسی یا انگلیسی (پیش‌فرض: فارسی)
 */
// applyPersianNumbers(UserSetting.get()?.displayNumbersInPersian ?? true);

/**
 * توابع مربوط به دریافت دیتا
 */
function getMainData() {
  let fullApiPath = props.apiPath;
  let data = props.queryString;
  const method = props.apiMethod ?? "get";

  if (method !== "post") {
    fullApiPath = `${fullApiPath}?${convertDataToQueryString(data)}`;
    data = null;
  }
  state.isPrinting = true;
  mainApiService
    .request(fullApiPath, data, method)
    .then((response) => {
      state.mainData = JSON.parse(JSON.stringify(response?.data ?? []));
    })
    .catch((e) => {
      errorProcessor(e);
    });
}

async function downloadData() {
  try {
    let fullApiPath = props.apiPath;
    let data = props.queryString;
    const method = props.apiMethod ?? "get";

    if (method !== "post") {
      fullApiPath = `${fullApiPath}?${convertDataToQueryString(data)}`;
      data = null;
    }

    const res = await fetch(fullApiPath, {
      method,
      mode: "cors",
      cache: "no-cache",
      headers: {
        Authorization: `Bearer ${AuthService.Cookie.getToken()}`,
        "Content-Type": "application/json",
      },
      body: data ? JSON.stringify(data) : null,
    });

    if (!res.ok) {
      throw res.status;
    }

    const responseData = await res.json();
    state.mainData = JSON.parse(JSON.stringify(responseData));
  } catch (err) {
    if (err === 422) {
      toast.error("خطا", "محتوایی برای چاپ وجود ندارد!", "error");
    } else if (err === 500) {
      toast.error("خطا", "خطای سرور", "error");
    } else if (err.message === "Request timed out") {
      toast.error("خطا", "زمان درخواست به پایان رسید.", "error");
    } else {
      errorProcessor(err);
    }
  }
}

/**
 * تابع setData، بر اساس وجود یا عدم وجود apiPath و همچنین مقدار hasDownloadFile
 * مشخص می‌کند دیتا را از سرور بگیرد یا از props.data استفاده کند.
 */
function setData() {
  if (props.apiPath) {
    if (!props.hasDownloadFile) {
      getMainData();
    } else {
      downloadData();
    }
  } else {
    // اگر apiPath نبود، یعنی دیتای ورودی از خود پراپ data تأمین می‌شود
    state.mainData = JSON.parse(JSON.stringify(props.data));
  }
}

/**
 * تابع تبدیل مقدار هر سلول بر اساس نوع ستون و printOptions
 */
function convertValue(val, item) {
  if (!item) return val ?? "";

  const {
    showTime,
    elapsed,
    isJalali,
    convertDate,
    emptyValue,
    format,
    zeroAllowed,
  } = item.printOptions || item.tableOptions || {};

  const safeVal =
    val ??
    item.printOptions?.emptyValue ??
    item.tableOptions?.emptyValue ??
    null;

  switch (item.type) {
    case "date":
      if (isJalali) {
        return convertDate ? convertToMiladi(safeVal, showTime) : safeVal;
      } else {
        return convertDate ? convertToJalali(safeVal, showTime) : safeVal;
      }
    case "enum":
      return (
        item.enumItems?.find((i) => i.key == (val ?? 0))?.value ??
        emptyValue ??
        ""
      );
    case "number":
      if (item.tableOptions?.separator) {
        return filterNumbersWithSep(val, zeroAllowed);
      }
      return val ?? emptyValue ?? "";
    case "boolean":
      return val ? "✓" : (emptyValue ?? "-");
    default:
      return safeVal;
  }
}

/**
 * شیء تنظیمات کتابخانه vu3-print-nb
 */
const printLetterObj = {
  id: "LetterForPrint", // همان بخشی که باید چاپ شود
  popTitle: "print",
  beforeOpenCallback() {},
  openCallback() {},
  closeCallback() {
    // پس از بسته‌شدن چاپ، اگر لازم است کاری انجام شود، اینجا بنویسید
  },
};

/**
 * تابع اصلی برای هندل‌کردن شروع فرایند چاپ.
 */
function handlePrint() {
  state.isPrinting = true;
  setData();
}

/**
 * هر زمان mainData تغییری کند (و طولش خالی نباشد)،
 * اگر در حالت چاپ باشیم، فرآیند کتابخانه vu3-print-nb را اجرا می‌کنیم.
 */
watch(
  () => state.mainData,
  (newVal) => {
    if (!newVal?.length) {
      // اگر دیتا خالی است، لودینگ را خاموش کن
      state.isPrinting = false;
      // toast.error("هیچ داده‌ای برای چاپ گرفتن وجود ندارد!");
      return;
    }
    if (state.isPrinting) {
      setTimeout(() => {
        // کلیک روی این input پنهان موجب فراخوانی کتابخانه vu3-print-nb می‌شود
        document?.getElementById("printButton")?.click();
        state.isPrinting = false;
      }, 200);
    }
  },
);

function handleCancelLoadingPrint() {
  state.isPrinting = false;
}
</script>

<template>
  <!-- لودینگ هنگام چاپ -->
  <!--  <OverlayLoading-->
  <!--    v-if="state.isPrinting"-->
  <!--    showCancel-->
  <!--    title="در حال آماده‌سازی جدول برای چاپ ..."-->
  <!--    @cancel="handleCancelLoadingPrint"-->
  <!--  />-->

  <!-- نگهداری محتوای اسلات هدر به‌صورت مخفی در DOM -->
  <div ref="headerRef" style="display: none">
    <slot name="header" />
  </div>

  <div class="container">
    <v-btn prepend-icon="mdi-printer" variant="text" @click="handlePrint"
      >چاپ
    </v-btn>
    <!--    <button-->
    <!--      :class="`btn-${props.btnColor}` ?? 'btn-green'"-->
    <!--      class="btn btn-print"-->
    <!--      @click="handlePrint"-->
    <!--    >-->
    <!--      <i class="fa-duotone fa-print ml-2"></i>-->
    <!--      <span>{{ props.btnTitle }}</span>-->
    <!--    </button>-->
    <!--    <v-tooltip-->
    <!--      v-if="props.btnTooltip"-->
    <!--      :hide-delay="100"-->
    <!--      :open-delay="300"-->
    <!--      activator="parent"-->
    <!--      location="top"-->
    <!--      open-on-click-->
    <!--    >-->
    <!--      {{ props.btnTooltip }}-->
    <!--    </v-tooltip>-->
  </div>

  <!-- در این Div، محتوایی که باید چاپ شود را قرار می‌دهیم -->
  <template>
    <div id="LetterForPrint" class="print-area">
      <!-- اگر هدر چاپ فعال باشد -->
      <div
        v-if="props.printSettings.header.show"
        v-html="props.printSettings.header.content"
      />
      <!-- در غیر اینصورت، از اسلات هدر (در صورت وجود) یا عنوان کامپوننت -->
      <template v-else>
        <template v-if="headerRef?.innerHTML.trim()">
          <div v-html="headerRef?.innerHTML" />
        </template>
        <template v-else>
          <div class="flex justify-center mt-[.5cm] mb-[1.2cm]">
            <h2>{{ props.title }}</h2>
          </div>
        </template>
      </template>

      <table>
        <thead>
          <tr>
            <th
              v-if="props.printSettings.showRowNumbers"
              style="text-align: center"
            >
              ردیف
            </th>
            <th
              v-for="(col, index) in props.itemProps"
              :key="'th' + index"
              :class="col.printOptions?.thClass || ''"
              :style="col.printOptions?.thStyles || ''"
            >
              {{ col.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in state.mainData" :key="'row' + rowIndex">
            <td
              v-if="props.printSettings.showRowNumbers"
              style="text-align: center"
            >
              {{ rowIndex + 1 }}
            </td>
            <td
              v-for="(col, cIndex) in props.itemProps"
              :key="'col' + cIndex"
              :class="col.printOptions?.class || ''"
              :style="col.printOptions?.styles || ''"
            >
              {{ convertValue(row[col.prop], col) }}
            </td>
            <td v-show="rowIndex % 5 === 0" class="page-break page-number"></td>
          </tr>
        </tbody>
      </table>

      <!-- اگر فوتر چاپ فعال باشد -->
      <div
        v-if="props.printSettings.footer.show"
        class="footer"
        v-html="props.printSettings.footer.content"
      />
    </div>
  </template>

  <!-- این input پنهان برای کتابخانه vu3-print-nb -->
  <input id="printButton" v-print="printLetterObj" style="display: none" />
</template>

<style scoped>
/* display: none; */

.print-area {
  direction: rtl;
  text-align: right;
}

.container {
  @apply flex my-4 mx-2.5 w-auto;
}

.btn-print {
  @apply font-bold;

  span {
    @apply text-[1.2em];
  }

  i {
    @apply text-[1.6em];
  }
}

@media print {
  @page {
    direction: rtl;
    margin: 1cm;
    size: A4 portrait; /* پیش‌فرض، یا از props.printSettings قابل تنظیم */
  }

  .page-number::before {
    content: "صفحه: " counter(page_number);
    counter-increment: page_number;
  }

  .page-break {
    break-after: page;
  }

  body {
    counter-reset: page 1;
    font-size: 14px; /* تغییر سایز فونت برای چاپ */
    line-height: 1.6; /* تنظیم فاصله خطوط */
    margin: 1cm; /* حاشیه کاغذ */
  }

  h2 {
    font-size: 26px; /* اندازه فونت عنوان */
    color: #000; /* رنگ مشکی برای عنوان */
    font-weight: bold;
  }

  table {
    border-collapse: collapse; /* جلوگیری از فاصله خطوط جدول */
    width: 100%;
  }

  th,
  td {
    border: 1px solid #000; /* خطوط مشکی برای جدول */
    padding: 6px; /* فضای داخلی سلول‌ها */
  }

  th {
    background-color: #f8f8f8; /* رنگ پس‌زمینه سربرگ جدول */
  }

  /* مخفی‌کردن دکمه‌ها و اجزای غیرضروری زمان چاپ */
  .btn-print,
  .tooltip,
  .headerRef {
    display: none;
  }
}
</style>
