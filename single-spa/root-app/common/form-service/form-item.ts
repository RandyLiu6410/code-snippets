export const FormItemValueType = {
  string: "String",
  object: "Object",
  array: "Array",
  number: "Number",
  date: "Date",
  user: "User",
  dept: "Dept",
  dateRange: "DateRange",
} as const;

export interface IFormItem {
  id: string;
  formId: string;
  icon: string;
  name: string;
  title: string;
  valueType: string;
  props: {
    required: boolean;
    enablePrint: boolean;
    placeholder: string | string[];
    target: {
      folderId: string;
    };
    options: string[];
  };
}
