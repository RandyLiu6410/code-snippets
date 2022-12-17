import * as _ from "lodash";

export const getDefault = (val, df) => {
  return val && val !== "" ? val : df;
};

export const getOrdinaryConditionContent = (condition) => {
  switch (condition.compare) {
    case "IN":
      return `${condition.title}为[${String(condition.value).replace(
        ",",
        "、"
      )}]中之一`;
    case "B":
      return `${condition.value[0]} < ${condition.title} < ${condition.value[1]}`;
    case "AB":
      return `${condition.value[0]} ≤ ${condition.title} < ${condition.value[1]}`;
    case "BA":
      return `${condition.value[0]} < ${condition.title} ≤ ${condition.value[1]}`;
    case "ABA":
      return `${condition.value[0]} ≤ ${condition.title} ≤ ${condition.value[1]}`;
    case "<=":
      return `${condition.title} ≤ ${getDefault(condition.value[0], " ?")}`;
    case ">=":
      return `${condition.title} ≥ ${getDefault(condition.value[0], " ?")}`;
    default:
      return `${condition.title}${condition.compare}${getDefault(
        condition.value[0],
        " ?"
      )}`;
  }
};

export const ConditionCheck = (value, condition) => {
  if (condition.valueType === "String" && _.isArray(value)) return false;
  if (condition.valueType === "Array" && !_.isArray(value)) return false;
  const _value = _.isArray(value) ? value : [value];

  if (condition.compare === "=") return _.isEqual(_value, condition.value);
  if (condition.compare === "IN") {
    if (!_.isArray(condition.value)) return false;
    const forName = condition.value[0] && !!condition.value[0].name;
    if (forName) {
      return _.includes(
        condition.value.map((v) => v.name),
        _value[0]
      );
    } else return _.includes(condition.value, _value[0]);
  }

  const __value = _value[0];
  const target1 = condition.value[0];
  const target2 = condition.value[1];
  switch (condition.compare) {
    case ">":
      return Number(__value) > Number(target1);
    case ">=":
      return Number(__value) >= Number(target1);
    case "<":
      return Number(__value) < Number(target1);
    case "<=":
      return Number(__value) <= Number(target1);
    case "B":
      return (
        Number(__value) > Number(target1) && Number(__value) < Number(target2)
      );
    case "AB":
      return (
        Number(__value) >= Number(target1) && Number(__value) < Number(target2)
      );
    case "BA":
      return (
        Number(__value) > Number(target1) && Number(__value) <= Number(target2)
      );
    case "ABA":
      return (
        Number(__value) >= Number(target1) && Number(__value) <= Number(target2)
      );
    default:
      return false;
  }
};
