export interface RuleOption {
  name: string;
  description: string;
}

export interface Rule {
  id: string;
  name: string;
  type: "select" | "input";
  description: string;
  required: boolean;
  ruleOptions: RuleOption[]; // type === 'select'
  textType: "string" | "number"; // type === 'input'
  textMinLength: number;
  textMaxLength: number;
}

export interface INamingRule {
  id: string;
  clientId: string;
  alias: string;
  description: string;
  rules: Rule[];
}
