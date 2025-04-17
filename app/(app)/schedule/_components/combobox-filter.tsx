import { Check, ChevronDownIcon } from "lucide-react";

import { Badge } from "@/app/_components/ui/badge";
import { Button } from "@/app/_components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/app/_components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/_components/ui/popover";
import { Separator } from "@/app/_components/ui/separator";
import { cn } from "@/app/_lib/utils";

interface ComboboxFilterProps {
  title: string;
  options: { label: string; value: string; icon?: React.ReactNode }[];
  values: string[];
  handleUpdateValues: (values: string[]) => void;
}

const ComboboxFilter = ({
  title,
  options,
  values,
  handleUpdateValues,
}: ComboboxFilterProps) => {
  const handleSelectValue = (value: string) => {
    const selectedValues = values.includes(value)
      ? values.filter((status) => status !== value)
      : [...values, value];
    handleUpdateValues(selectedValues);
  };

  const handleClearValues = () => {
    handleUpdateValues([]);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="justify-between border border-input bg-transparent font-normal text-muted-foreground hover:bg-transparent">
          {title}
          <ChevronDownIcon className="size-4 opacity-50" />
          {values.length > 0 && (
            <>
              <Separator orientation="vertical" className="mx-1 h-4" />

              <Badge
                variant="secondary"
                className="rounded-sm px-1 font-normal"
              >
                {values.length} selecionados
              </Badge>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="min-w-[250px] p-0">
        <Command>
          <CommandInput placeholder={title} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options
                .sort((a, b) => {
                  if (a.label < b.label) return -1;
                  if (a.label > b.label) return 1;
                  return 0;
                })
                .map((option) => {
                  const isSelected = values.includes(option.value);
                  const { label, value, icon } = option;
                  return (
                    <CommandItem
                      key={value}
                      onSelect={() => {
                        handleSelectValue(value);
                      }}
                    >
                      <div
                        className={cn(
                          "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "opacity-50 [&_svg]:invisible",
                        )}
                      >
                        <Check className={cn("h-4 w-4")} />
                      </div>
                      {icon && icon}
                      <span>{label}</span>
                    </CommandItem>
                  );
                })}
            </CommandGroup>
            {values.length > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={handleClearValues}
                    className="justify-center text-center"
                  >
                    Limpar filtros
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboboxFilter;
