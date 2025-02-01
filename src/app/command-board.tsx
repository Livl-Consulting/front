"use client";

import { Badge } from "@/components/ui/badge";
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
  ShoppingCart,
  File,
  CircleHelp,
  Package,
  PackagePlus,
  CalendarCheck,
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
        <CommandGroup heading="Echéancier">
          <CommandItem>
            <CalendarCheck />
            <Badge variant="destructive">TODO</Badge>
            Consulter mes échéances
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
          <CommandItem onSelect={() => push("/quotes/add")}>
            <FilePlus2 />
            Créer un devis
          </CommandItem>
          <CommandItem onSelect={() => push("/quotes")}>
            <File />
            Consulter mes devis
          </CommandItem>
        </CommandGroup>
        <CommandGroup heading="Commandes de vente">
          <CommandItem onSelect={() => push("/sale-orders")}>
            <ShoppingCart />
            Consulter mes commandes de ventes
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
        <CommandGroup heading="Saisie de commandes - Achats">
          <CommandItem onSelect={() => push("/purchase-orders/add")}>
            <PackagePlus />
            Saisir une commande d&apos;achat
          </CommandItem>
          <CommandItem onSelect={() => push("/purchase-orders")}>
            <Package />
            Consulter mes commandes d&apos;achats
          </CommandItem>
        </CommandGroup>
        <CommandSeparator />
      </CommandList>
    </Command>
  );
};
