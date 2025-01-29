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
  CircleHelp,
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
        <CommandSeparator />
        <CommandGroup heading="Clients">
          <CommandItem onSelect={() => push("/clients/add")}>
            <UserPlus />
            Nouveau client
          </CommandItem>
          <CommandItem onSelect={() => push("/clients")}>
            <Users />
            Mes clients
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Opportunités de vente">
          <CommandItem onSelect={() => push("/opportunities/add")}>
            <Plus />
            Nouvelle opportunité
          </CommandItem>
          <CommandItem onSelect={() => push("/opportunities")}>
            <Cat />
            Consulter mes opportunités
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Devis de vente">
          <CommandItem>
            <FilePlus2 />
            Créer un devis
          </CommandItem>
          <CommandItem>
            <File />
            Consulter mes devis
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Commandes de vente">
          <CommandItem>
            <CirclePlus />
            Créer une commande
          </CommandItem>
          <CommandItem>
            <ShoppingCart />
            Consulter mes commandes
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Règlement de vente">
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
        <CommandGroup heading="Fournisseurs">
          <CommandItem onSelect={() => push("/suppliers/add")}>
            <UserPlus />
            Nouveau fournisseur
          </CommandItem>
          <CommandItem onSelect={() => push("/suppliers")}>
            <Users />
            Mes fournisseurs
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Saisie de demandes de prix - Achats">
          <CommandItem onSelect={() => push("/price-requests/add")}>
            <Plus />
            Saisir une demande de prix
          </CommandItem>
          <CommandItem onSelect={() => push("/price-requests")}>
            <CircleHelp />
            Consulter mes demandes de prix
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
};
