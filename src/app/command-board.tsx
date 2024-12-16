"use client";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  Plus,
  Puzzle,
  UserPlus,
  Users,
  Cat,
  FilePlus2,
  CirclePlus,
  ShoppingCart,
  File,
} from "lucide-react";
import { useRouter } from "next/navigation";

export const CommandBoard = () => {
  const { push } = useRouter();

  return (
    <Command className="border border-border rounded-xl shadow-sm">
      <CommandInput placeholder="Que souhaitez vous faire aujourd'hui ?" />
      <CommandList>
        <CommandEmpty>Aucun résultat.</CommandEmpty>
        <CommandGroup heading="Produits">
          <CommandItem onSelect={() => push("/products/add")}>
            <Plus />
            Nouveau produit
          </CommandItem>
          <CommandItem onSelect={() => push("/products")}>
            <Puzzle />
            Mes produits
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Clients">
          <CommandItem>
            <UserPlus />
            Nouveau client
          </CommandItem>
          <CommandItem>
            <Users />
            Mes clients
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Opportunités">
          <CommandItem>
            <Plus />
            Nouvelle opportunité
          </CommandItem>
          <CommandItem>
            <Cat />
            Consulter mes opportunités
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Devis">
          <CommandItem>
            <FilePlus2 />
            Créer un devis
          </CommandItem>
          <CommandItem>
            <File />
            Consulter mes devis
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Commandes">
          <CommandItem>
            <CirclePlus />
            Créer une commande
          </CommandItem>
          <CommandItem>
            <ShoppingCart />
            Consulter mes commandes
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Règlement">
          <CommandItem>
            <FilePlus2 />
            Créer un règlement
          </CommandItem>
          <CommandItem>
            <File />
            Consulter mes règlements
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
};
