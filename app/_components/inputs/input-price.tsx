import { Control, FieldValues, Path } from "react-hook-form";
import { NumericFormat } from "react-number-format";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface InputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  description: string;
  disabled?: boolean;
  className?: string;
}

export const InputPrice = <T extends FieldValues>({
  control,
  name,
  description,
  disabled,
  className,
}: InputProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { ref, ...rest } }) => (
        <FormItem className={className}>
          <FormLabel>{description}</FormLabel>
          <FormControl className="text-right">
            <NumericFormat
              thousandSeparator="."
              decimalSeparator=","
              prefix="R$ "
              decimalScale={2}
              customInput={Input}
              getInputRef={ref}
              disabled={disabled}
              {...rest}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputPrice;
