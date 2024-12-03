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
  Cat,
  CirclePlus,
  Croissant,
  File,
  FilePlus2,
  Plus,
  Puzzle,
  ShoppingCart,
  UserPlus,
  Users,
} from "lucide-react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-2xl font-medium">Welcome to Livl Consulting ERP</h1>

        <Command className="border border-border rounded-xl shadow-sm">
          <CommandInput placeholder="Que souhaitez vous faire aujourd'hui ?" />
          <CommandList>
            <CommandEmpty>Aucun résultat.</CommandEmpty>
            <CommandItem>
              <Croissant />
              Mon dashboard
            </CommandItem>
            <CommandGroup heading="Produits">
              <CommandItem>
                <Plus />
                Nouveau produit
              </CommandItem>
              <CommandItem>
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
      </main>
    </div>
  );
}
