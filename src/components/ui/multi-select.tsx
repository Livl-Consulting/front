"use client";

import * as React from "react";
import { PlusCircle, X } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { cn } from "@/lib/utils";

export type AutocompleteOption = Record<"value" | "label", string>;

type Props = {
  options?: AutocompleteOption[];
  onSelectionChange: (value: AutocompleteOption[]) => void;
  selection: AutocompleteOption[];
  onInputChange?: (value: string) => void;
  value?: string;
  className?: string;
  addLabel?: string;
  placeholder?: string;
  leading?: React.ReactNode;
};

export const MultiSelect: React.FC<Props> = ({
  options,
  onSelectionChange,
  selection,
  onInputChange,
  value,
  className,
  addLabel = "Ajouter",
  placeholder = "...",
  leading,
}) => {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const [open, setOpen] = React.useState(false);
  const [inputValue, setInputValue] = React.useState(value);

  const handleUnselect = React.useCallback((option: AutocompleteOption) => {
    onSelectionChange(selection.filter((s) => s.value !== option.value));
  }, []);

  React.useEffect(() => {
    if (onInputChange) {
      onInputChange(inputValue ?? "");
    }
  }, [inputValue]);

  const handleKeyDown = React.useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      const input = inputRef.current;
      if (input) {
        if (e.key === "Delete" || e.key === "Backspace") {
          if (input.value === "") {
            const newSelected = [...selection];
            newSelected.pop();
            onSelectionChange(newSelected);
          }
        }
        // This is not a default behaviour of the <input /> field
        if (e.key === "Escape") {
          input.blur();
        }
      }
    },
    []
  );

  const selectables = (options ?? []).filter(
    (option) => !selection.includes(option)
  );

  return (
    <Command
      onKeyDown={handleKeyDown}
      shouldFilter={false}
      className={cn("overflow-visible bg-transparent", className)}
    >
      <div className="group rounded-md border border-input px-3 py-2 text-sm ring-offset-background focus-within:ring-1 focus-within:ring-ring shadow-sm flex items-center gap-1">
        {leading}
        <div className="flex flex-wrap gap-1 flex-1">
          {selection.map((option, i) => {
            return (
              <Badge key={`${option.label}-${i}`} variant="secondary">
                {option.label}
                <button
                  className="ml-1 rounded-full outline-none ring-offset-background focus:ring-2 focus:ring-ring focus:ring-offset-2"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleUnselect(option);
                    }
                  }}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                  onClick={() => handleUnselect(option)}
                >
                  <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                </button>
              </Badge>
            );
          })}
          <CommandPrimitive.Input
            ref={inputRef}
            value={inputValue}
            onValueChange={setInputValue}
            onBlur={() => setOpen(false)}
            onFocus={() => setOpen(true)}
            placeholder={placeholder}
            className="ml-2 flex-1 bg-transparent outline-none placeholder:text-muted-foreground"
          />
        </div>
      </div>
      <div className="relative mt-2">
        <CommandList>
          {open ? (
            <div className="absolute top-0 z-10 w-full rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in">
              {selectables.length > 0 ? (
                <>
                  <CommandGroup className="h-full overflow-auto">
                    {selectables.map((framework) => {
                      return (
                        <CommandItem
                          key={framework.value}
                          onMouseDown={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                          }}
                          onSelect={() => {
                            setInputValue("");
                            onSelectionChange([...selection, framework]);
                          }}
                          className={"cursor-pointer"}
                        >
                          {framework.label}
                        </CommandItem>
                      );
                    })}
                  </CommandGroup>
                  <CommandSeparator />
                </>
              ) : null}
              {inputValue ? (
                <CommandGroup>
                  <CommandItem
                    onMouseDown={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                    }}
                    onSelect={() => {
                      if (!inputValue) {
                        return;
                      }

                      setInputValue("");
                      onSelectionChange([
                        ...selection,
                        { value: inputValue, label: inputValue },
                      ]);
                    }}
                    className={"cursor-pointer"}
                  >
                    <PlusCircle className="w-4 h-4 mr-2" />
                    {addLabel}
                  </CommandItem>
                </CommandGroup>
              ) : null}
            </div>
          ) : null}
        </CommandList>
      </div>
    </Command>
  );
};
