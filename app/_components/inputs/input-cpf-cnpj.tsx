import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import { maskCpfCnpj } from "@/app/_utils/helper";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface InputCpfCnpjProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

export const InputCpfCnpj = <T extends FieldValues>({
  control,
  name,
  label = "CPF ou CNPJ",
}: InputCpfCnpjProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...rest } }) => {
        return (
          <FormItem>
            <FormLabel>{label}</FormLabel>
            <FormControl>
              <Input
                onChange={(e) => {
                  const inputValue = e.target.value.replace(/\D/g, "");
                  const truncatedValue = inputValue.substring(0, 14);
                  onChange(maskCpfCnpj(truncatedValue));
                }}
                {...rest}
                value={value}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
};

export default InputCpfCnpj;
