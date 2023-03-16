import Args from "./args";
import Core from "./core.module";
import Implanter from "./implanter.module";

let _args: Args = new Args();

export default class SimpleMaskMoney {
  static get args(): Args {
    return _args;
  }

  static set args(value: Args) {
    _args = new Args(value);
  }

  static formatToCurrency(value: string, args?: Args): string {
    const core = new Core(
      typeof args !== "undefined" && args instanceof Args ? args : _args
    );
    core.args.beforeFormat(value);

    const negative = core.args.allowNegative && value.indexOf("-") !== -1;
    const formatation = core.numberToText(core.textToNumber(value));
    const result = `${
      !core.args.negativeSignAfter && negative ? "-" : ""
    }${formatation}${core.args.negativeSignAfter && negative ? "-" : ""}`;

    core.args.afterFormat(result);

    return result;
  }

  static formatToMask(input: string, args?: Args): string {
    const core = new Core(
      typeof args !== "undefined" && args instanceof Args ? args : _args
    );
    const value = input.toString();
    core.args.beforeFormat(value);

    const result = core.mask(value);

    core.args.afterFormat(result);

    return result;
  }

  static formatToNumber(input: string, args?: Args): number {
    const core = new Core(
      typeof args !== "undefined" && args instanceof Args ? args : _args
    );
    let value = input.toString();
    core.args.beforeFormat(value);
    let result = 0;

    const negative = core.args.allowNegative && value.indexOf("-") !== -1;

    if (negative) {
      value = value.replace("-", "");
    }

    value = core.textToNumber(value);

    if (!core.args.fixed) {
      value = value.replace(new RegExp("_", "g"), "");
    }

    if (!isNaN(parseFloat(value))) {
      result = parseFloat(negative ? value * -1 : value);
    }

    core.args.afterFormat(result);

    return result;
  }

  static setMask(element: string | HTMLElement, args?: Args): HTMLElement {
    if (typeof document === "undefined")
      throw new Error("This function only works on client side");

    const input =
      typeof element === "string" ? document.querySelector(element) : element;
    const core = new Core(
      typeof args !== "undefined" && args instanceof Args ? args : _args
    );

    Implanter.addPropertyMask(input, core);
    Implanter.addMask(input, core);
    Implanter.refreshMask(input);

    input.formatToNumber = () =>
      SimpleMaskMoney.formatToNumber(input.value, input.maskArgs);

    return input as HTMLElement;
  }
}
// move to a d.ts file and import it here
export interface ArgsProps {
  afterFormat?: (value: string) => void;
  allowNegative?: boolean;
  beforeFormat?: (value: string) => void;
  negativeSignAfter?: boolean;
  decimalSeparator?: string;
  fixed?: boolean;
  fractionDigits?: number;
  prefix?: string;
  suffix?: string;
  thousandsSeparator?: string;
  cursor?: string;
}

// export class Args implements ArgsProps {
//   afterFormat = (value: string) => {};
//   allowNegative = false;
//   beforeFormat = (value: string) => {};
//   negativeSignAfter = false;
//   decimalSeparator = ",";
// }
