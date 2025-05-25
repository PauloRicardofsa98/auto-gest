import { type ClassValue, clsx } from "clsx";
import {
  endOfDay,
  endOfMonth,
  endOfWeek,
  startOfDay,
  startOfMonth,
  startOfWeek,
  subDays,
  subMonths,
  subWeeks,
} from "date-fns";
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => {
  return twMerge(clsx(inputs));
};

export const maskCpfCnpj = (v: string) => {
  v = v.replace(/\D/g, "");

  if (v.length <= 11) {
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d)/, "$1.$2");
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  } else {
    v = v.replace(/^(\d{2})(\d)/, "$1.$2");
    v = v.replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3");
    v = v.replace(/\.(\d{3})(\d)/, ".$1/$2");
    v = v.replace(/(\d{4})(\d)/, "$1-$2");
  }

  return v;
};
export const removeMask = (value: string): string => {
  if (!value) return "";
  return value.replace(/\D/g, "");
};

export const currencyFormat = (value: number): string => {
  return value.toLocaleString("pt-br", {
    style: "currency",
    currency: "BRL",
  });
};

export const doubleFormat = (value: string): number => {
  if (!value) return 0;
  const cleanedValue = value
    .replace("R$", "")
    .replace(/\./g, "")
    .replace(",", ".")
    .trim();

  const decimalValue = parseFloat(cleanedValue);

  return parseFloat(decimalValue.toFixed(2));
};

type FilterPeriod =
  | "CURRENT_DAY"
  | "PREVIOUS_DAY"
  | "CURRENT_WEEK"
  | "PREVIOUS_WEEK"
  | "CURRENT_MONTH"
  | "PREVIOUS_MONTH";

export const getFilterPeriod = (
  filter: FilterPeriod,
  range?: DateRange,
): { gte: Date; lte: Date } => {
  if (range) {
    const { from, to } = range;
    if (from && to) {
      return {
        gte: startOfDay(from),
        lte: endOfDay(to),
      };
    }
  }

  const now = new Date();

  switch (filter) {
    case "CURRENT_DAY":
      return {
        gte: startOfDay(now),
        lte: endOfDay(now),
      };

    case "PREVIOUS_DAY":
      const previousDay = subDays(now, 1);
      return {
        gte: startOfDay(previousDay),
        lte: endOfDay(previousDay),
      };

    case "CURRENT_WEEK":
      return {
        gte: startOfWeek(now, { weekStartsOn: 0 }), // Sunday as the first day of the week
        lte: endOfWeek(now, { weekStartsOn: 0 }),
      };

    case "PREVIOUS_WEEK":
      const previousWeek = subWeeks(now, 1);
      return {
        gte: startOfWeek(previousWeek, { weekStartsOn: 0 }),
        lte: endOfWeek(previousWeek, { weekStartsOn: 0 }),
      };

    case "CURRENT_MONTH":
      return {
        gte: startOfMonth(now),
        lte: endOfMonth(now),
      };

    case "PREVIOUS_MONTH":
      const previousMonth = subMonths(now, 1);
      return {
        gte: startOfMonth(previousMonth),
        lte: endOfMonth(previousMonth),
      };

    default:
      throw new Error("Invalid filter period");
  }
};

export const applyPlateMask = (value: string): string => {
  const len = value.length;

  if (len === 0) {
    return "";
  }

  const isPotentialMercosul = len >= 5 && /[A-Z]/.test(value[4]);

  if (isPotentialMercosul) {
    return value;
  } else {
    if (len <= 3) {
      return value;
    }
    return `${value.substring(0, 3)}-${value.substring(3)}`;
  }
};
