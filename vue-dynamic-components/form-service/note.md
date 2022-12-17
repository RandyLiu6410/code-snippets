# Form-service dynamic components

Define component config

```javascript
{
    title: i18n.t("form.item.TextInput"),
    name: "TextInput", // used to link dynamic component
    icon: "edit",
    value: "",
    valueType: FormItemValueType.string,
    props: {
      required: false,
      enablePrint: true,
      placeholder: i18n.t("form.item.placeholder.TextInput"),
    },
  }
```

High order component

```vue
<template>
  <a-form v-if="formItem">
    <a-form-item :label="$t('form.item.name')">
      <a-input
        size="small"
        allowClear
        v-model="formItem.title"
        @change="handleTitleChange"
      />
    </a-form-item>
    <component
      :is="formItem.name"
      v-model="formItem.props"
      @change="handlePropsChange"
    />
    <a-form-item :label="$t('form.item.required')">
      <a-switch
        v-model="formItem.props.required"
        @change="$emit('change', formItem)"
      ></a-switch>
    </a-form-item>
  </a-form>
</template>

<script>
import TextInput from "@/components/Form/config/TextInputConfig.vue";
import NumberInput from "@/components/Form/config/NumberInputConfig.vue";
import TextareaInput from "@/components/Form/config/TextareaInputConfig.vue";
import SelectInput from "@/components/Form/config/SelectInputConfig.vue";
import SelectsInput from "@/components/Form/config/SelectsInputConfig.vue";
import DateTime from "@/components/Form/config/DateTimeConfig.vue";
import DateTimeRange from "@/components/Form/config/DateTimeRangeConfig.vue";
import ImageUpload from "@/components/Form/config/ImageUploadConfig.vue";
import FileUpload from "@/components/Form/config/FileUploadConfig.vue";
import ODescription from "@/components/Form/config/ODescriptionConfig.vue";
import MoneyInput from "@/components/Form/config/MoneyInputConfig.vue";
import { mapState } from "vuex";
import * as _ from "lodash";

export default {
  name: "FormComponentConfig",
  components: {
    TextInput,
    NumberInput,
    TextareaInput,
    SelectInput,
    SelectsInput,
    DateTime,
    DateTimeRange,
    ImageUpload,
    FileUpload,
    ODescription,
    MoneyInput,
  },
  props: {
    formSelected: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    ...mapState("form", {
      formItems: (state) => state.formItems,
    }),
    formItem: {
      get() {
        return this.formItems[this.formSelected];
      },
      set(val) {
        this.$store.commit("form/setFormItem", {
          index: this.formSelected,
          value: val,
        });
      },
    },
  },
  methods: {
    handleTitleChange(e) {
      this.formItem.title = e.target.value;
      this.$store.commit("form/setFormItem", {
        index: this.formSelected,
        value: _.cloneDeep(this.formItem),
      });
      this.$emit("change", this.formItem);
    },
    handlePropsChange(props) {
      this.formItem.props = props;
      this.$store.commit("form/setFormItem", {
        index: this.formSelected,
        value: _.cloneDeep(this.formItem),
      });
      this.$emit("change", this.formItem);
    },
  },
};
</script>
```

Config component

```vue
<template>
  <a-form-item :label="$t('form.config.placeholderTitle')">
    <a-input
      size="small"
      :value="value.placeholder"
      @change="(e) => placeholderChange(e.target.value)"
      :placeholder="$t('form.config.placeholderPlaceHolder')"
    />
  </a-form-item>
</template>

<script>
export default {
  name: "TextInput",
  components: {},
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  methods: {
    placeholderChange(_v) {
      const _value = Object.assign({}, this.value);
      _value.placeholder = _v;
      this.$emit("change", _value);
    },
  },
};
</script>
```
