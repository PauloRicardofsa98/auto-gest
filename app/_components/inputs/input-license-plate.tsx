import { Control, FieldValues, Path } from "react-hook-form";

import { applyPlateMask } from "@/app/_utils/helper";

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

interface InputPlateProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  description: string;
  disabled?: boolean;
  className?: string;
  onBlurCallback?: () => void;
}

const InputPlate = <T extends FieldValues>({
  control,
  disabled,
  name,
  description,
  className,
  onBlurCallback,
}: InputPlateProps<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field: { onChange, value, ...rest } }) => (
        <FormItem className={className}>
          <FormLabel>{description}</FormLabel>
          <FormControl>
            <Input
              {...rest} // Spreads onBlur, name, ref from react-hook-form
              value={value || ""} // Ensure value is not undefined/null for the input
              onChange={(e) => {
                const rawValue = e.target.value;
                // 1. Remove non-alphanumeric characters
                // 2. Convert to uppercase
                // 3. Limit to 7 characters
                const cleanedValue = rawValue
                  .replace(/[^a-zA-Z0-9]/g, "")
                  .toUpperCase()
                  .substring(0, 7);

                const maskedValue = applyPlateMask(cleanedValue);
                onChange(maskedValue); // Update react-hook-form field value
              }}
              onBlur={() => {
                if (rest.onBlur) {
                  rest.onBlur(); // Ensure react-hook-form's onBlur is called
                }
                if (onBlurCallback) {
                  onBlurCallback(); // Call the custom onBlur callback if provided
                }
              }}
              disabled={disabled}
              style={{ textTransform: "uppercase" }} // Visually reinforces uppercase input
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputPlate;
