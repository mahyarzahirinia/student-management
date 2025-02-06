export const switchesInit = {
  animation: {
    selected: true,
  },
  isHelp: {
    selected: true,
  },
  isPersianNumbers: {
    selected: true,
  },
  isChangesQuicklyApplied: {
    selected: true,
  },
};

export const selectsInit = {
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

export const userSettingsInit = {
  selects: { ...selectsInit },
  switches: { ...switchesInit },
};
