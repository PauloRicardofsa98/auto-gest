import { HTMLInputTypeAttribute } from "react";
import { Control, FieldValues, Path } from "react-hook-form";
import { PatternFormat } from "react-number-format";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface InputEmailProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  description: string;
  disabled?: boolean;
  type?: HTMLInputTypeAttribute;
  format?: string;
  className?: string;
  onBlur?: () => void;
}
const InputField = <T extends FieldValues>({
  control,
  disabled,
  name,
  description,
  type = "text",
  format,
  className,
  onBlur,
}: InputEmailProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={className}>
          <FormLabel>{description}</FormLabel>
          <FormControl>
            {format ? (
              <PatternFormat
                format={format}
                customInput={Input}
                {...field}
                disabled={disabled}
              />
            ) : (
              <Input
                {...field}
                className={`${type === "number" ? "text-right" : ""}`}
                disabled={disabled}
                type={type}
                onBlur={onBlur}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputField;
