export const getPeriod = (period: string) => {
  try {
    const [firstDateString, lastDateString] = period.split("_");
    const initialDate = new Date(firstDateString);
    const finalDate = new Date(lastDateString);
    return {
      createdAt: {
        gte: initialDate,
        lte: finalDate,
      },
    };
  } catch {
    return undefined;
  }
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
