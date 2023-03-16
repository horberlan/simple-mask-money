interface ArgsConfig {
  afterFormat?: () => void;
  allowNegative?: boolean;
  beforeFormat?: () => void;
  negativeSignAfter?: boolean;
  decimalSeparator?: string;
  fixed?: boolean;
  fractionDigits?: number;
  prefix?: string;
  suffix?: string;
  thousandsSeparator?: string;
  cursor?: "move" | "end";
}

export default class Args {
  public afterFormat: () => void;
  public allowNegative: boolean;
  public beforeFormat: () => void;
  public negativeSignAfter: boolean;
  public decimalSeparator: string;
  public fixed: boolean;
  public fractionDigits: number;
  public prefix: string;
  public suffix: string;
  public thousandsSeparator: string;
  public cursor: "move" | "end";

  constructor(args?: ArgsConfig) {
    this.afterFormat = args?.afterFormat || (() => {});
    this.allowNegative = args?.allowNegative || false;
    this.beforeFormat = args?.beforeFormat || (() => {});
    this.negativeSignAfter = args?.negativeSignAfter || false;
    this.decimalSeparator = args?.decimalSeparator || ",";
    this.fixed = args?.fixed ?? true;
    this.fractionDigits = args?.fractionDigits ?? 2;
    this.prefix = args?.prefix || "";
    this.suffix = args?.suffix || "";
    this.thousandsSeparator = args?.thousandsSeparator || ".";
    this.cursor = args?.cursor || "move";
  }

  merge(args?: Partial<ArgsConfig>) {
    if (!args || typeof args !== "object") return;

    this.fractionDigits =
      typeof args.fractionDigits === "undefined" || isNaN(args.fractionDigits)
        ? this.fractionDigits
        : parseInt(args.fractionDigits.toString());

    this.afterFormat =
      typeof args.afterFormat === "function"
        ? args.afterFormat
        : this.afterFormat;

    this.beforeFormat =
      typeof args.beforeFormat === "function"
        ? args.beforeFormat
        : this.beforeFormat;

    this.fixed = typeof args.fixed === "boolean" ? args.fixed : this.fixed;

    this.allowNegative =
      typeof args.allowNegative === "boolean"
        ? args.allowNegative
        : this.allowNegative;

    this.negativeSignAfter =
      typeof args.negativeSignAfter === "boolean"
        ? args.negativeSignAfter
        : this.negativeSignAfter;

    this.decimalSeparator =
      typeof args.decimalSeparator === "undefined"
        ? this.decimalSeparator
        : args.decimalSeparator;

    this.prefix =
      typeof args.prefix === "undefined" ? this.prefix : args.prefix;

    this.suffix =
      typeof args.suffix === "undefined" ? this.suffix : args.suffix;

    this.thousandsSeparator =
      typeof args.thousandsSeparator === "undefined"
        ? this.thousandsSeparator
        : args.thousandsSeparator;

    this.cursor = typeof args.cursor === "undefined" ? this.cursor : args.cursor;
  }
}
