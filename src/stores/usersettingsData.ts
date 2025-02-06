// types
export type SwitchesInit = {
  animation: { selected: boolean };
  isHelp: { selected: boolean };
  isPersianNumbers: { selected: boolean };
  isChangesQuicklyApplied: { selected: boolean };
};

export type SelectOption<T = string> = {
  label: string;
  value: T;
};

export type SelectsInit = {
  template: {
    data: SelectOption<string>[];
    selected: string;
  };
  itemsPerPage: {
    data: SelectOption<string>[];
    selected: string;
  };
};

export type UserSettingsInit = {
  selects: SelectsInit;
  switches: SwitchesInit;
};

// inits
export const switchesInit: SwitchesInit = {
  animation: { selected: true },
  isHelp: { selected: true },
  isPersianNumbers: { selected: true },
  isChangesQuicklyApplied: { selected: true },
};

export const selectsInit: SelectsInit = {
  template: {
    data: [
      { label: "سبز", value: "green" },
      { label: "قرمز", value: "red" },
      { label: "زرد", value: "yellow" },
      { label: "خاکستری", value: "gray" },
    ],
    selected: "green",
  },
  itemsPerPage: {
    data: [
      { label: "5", value: "5" },
      { label: "10", value: "10" },
      { label: "15", value: "15" },
      { label: "همه", value: "-1" },
    ],
    selected: "5",
  },
};

export const userSettingsInit: UserSettingsInit = {
  selects: { ...selectsInit },
  switches: { ...switchesInit },
};
