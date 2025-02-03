<script lang="ts" setup>
import { ref, provide } from "vue";
import { RouterLink, RouterView } from "vue-router";
import MainAppBar from "@/components/MainAppBar.vue";
import NavigationDrawer from "@/components/NavigationDrawer.vue";
import LeftDrawer from "@/components/LeftDrawer.vue";

// all the components of syncfusion
import {
  DocumentEditorComponent as EjsDocumenteditor,
  Print,
  SfdtExport,
  WordExport,
  TextExport,
  Selection,
  Search,
  Editor,
  ImageResizer,
  EditorHistory,
  ContextMenu,
  OptionsPane,
  HyperlinkDialog,
  TableDialog,
  BookmarkDialog,
  TableOfContentsDialog,
  PageSetupDialog,
  StyleDialog,
  ListDialog,
  ParagraphDialog,
  BulletsAndNumberingDialog,
  FontDialog,
  TablePropertiesDialog,
  BordersAndShadingDialog,
  TableOptionsDialog,
  CellOptionsDialog,
  StylesDialog,
} from "@syncfusion/ej2-vue-documenteditor";

provide("DocumentEditor", [
  Print,
  SfdtExport,
  WordExport,
  TextExport,
  Selection,
  Search,
  Editor,
  ImageResizer,
  EditorHistory,
  ContextMenu,
  OptionsPane,
  HyperlinkDialog,
  TableDialog,
  BookmarkDialog,
  TableOfContentsDialog,
  PageSetupDialog,
  StyleDialog,
  ListDialog,
  ParagraphDialog,
  BulletsAndNumberingDialog,
  FontDialog,
  TablePropertiesDialog,
  BordersAndShadingDialog,
  TableOptionsDialog,
  CellOptionsDialog,
  StylesDialog,
]);

const isDrawerOpen = ref(true);
const isLeftDrawerOpen = ref(true);

const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value;
};

const toggleLeftDrawer = () => {
  isLeftDrawerOpen.value = !isLeftDrawerOpen.value;
};
</script>

<template>
  <v-locale-provider rtl>
    <v-app class="py-4" theme="light">
      <MainAppBar
        @toggleDrawer="toggleDrawer"
        @toggleLeftDrawer="toggleLeftDrawer"
      />
      <NavigationDrawer v-model="isDrawerOpen" />
      <LeftDrawer v-model="isLeftDrawerOpen" />
      <v-main>
        <v-container fluid>
          <RouterView />
        </v-container>
      </v-main>
    </v-app>
  </v-locale-provider>
</template>

<!--styles for syncfusion document editor-->
<style scoped>
@import "../node_modules/@syncfusion/ej2-base/styles/material.css";
@import "../node_modules/@syncfusion/ej2-buttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-inputs/styles/material.css";
@import "../node_modules/@syncfusion/ej2-popups/styles/material.css";
@import "../node_modules/@syncfusion/ej2-lists/styles/material.css";
@import "../node_modules/@syncfusion/ej2-navigations/styles/material.css";
@import "../node_modules/@syncfusion/ej2-splitbuttons/styles/material.css";
@import "../node_modules/@syncfusion/ej2-dropdowns/styles/material.css";
@import "../node_modules/@syncfusion/ej2-vue-documenteditor/styles/material.css";

header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
