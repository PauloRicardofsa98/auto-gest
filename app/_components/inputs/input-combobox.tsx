import { Check, ChevronsUpDown } from "lucide-react";
import { useState } from "react";
import { Control, FieldValues, Path } from "react-hook-form";

import { cn } from "@/app/_lib/utils";

import { Button } from "../ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "../ui/command";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

interface InputProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  form: any;
  description: string;
  options: { uuid: string; name: string }[];
  disabled?: boolean;
  className?: string;
}

const InputCombobox = <T extends FieldValues>({
  control,
  form,
  name,
  description,
  options,
  disabled,
  className,
}: InputProps<T>) => {
  const [open, setOpen] = useState(false);
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("flex flex-col py-2.5", className)}>
          <FormLabel>{description}</FormLabel>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                  disabled={disabled}
                >
                  {field.value
                    ? options.find((item) => item.uuid === field.value)?.name
                    : "Selecione uma opção"}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder="Procurar ..." />
                <CommandEmpty>Não encontrado.</CommandEmpty>
                <CommandGroup>
                  {options.map((item) => (
                    <CommandItem
                      key={item.uuid}
                      value={item.name}
                      onSelect={() => {
                        form.setValue(name, item.uuid);
                        setOpen(false);
                      }}
                    >
                      <Check
                        className={cn(
                          "mr-2 h-4 w-4",
                          field.value === item.uuid
                            ? "opacity-100"
                            : "opacity-0",
                        )}
                      />
                      {item.name}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default InputCombobox;
