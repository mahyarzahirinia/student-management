import type { ThemeDefinition } from "vuetify";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const twColors = resolveConfig(tailwindConfig).theme?.colors;

const greenTheme: ThemeDefinition = {
  dark: false,
  colors: {
    primary: twColors?.red[300],
    secondary: twColors?.red[300],
    background: twColors?.red[50],
    surface: twColors?.red[50],
    accent: twColors?.red[50],
    error: twColors?.red[500],
    success: twColors?.green[500],
    info: twColors?.gray[500],
    warning: twColors?.orange[500],
  },
};

export default greenTheme;
