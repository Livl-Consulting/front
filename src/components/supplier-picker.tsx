import { Supplier } from "@/models/supplier";
import { FC, useEffect, useState } from "react";
import { AutocompleteOption, MultiSelect } from "./ui/multi-select";
import { SearchIcon } from "lucide-react";
import { searchSuppliers } from "@/lib/actions/search-suppliers.action";

type Props = {
  name: string;
  initialSupplier?: Partial<Supplier>;
};

export const SupplierPicker: FC<Props> = ({ name, initialSupplier }) => {
  const [autocompleteOptions, setAutocompleteOptions] = useState<
    AutocompleteOption[]
  >([]);

  const [search, setSearch] = useState<string>("");
  const [supplier, setSupplier] = useState<Partial<Supplier> | undefined>(
    initialSupplier
  );

  const onAddSupplier = (v: AutocompleteOption[]) => {
    if (!v.length) {
      return;
    }

    const { value, label } = v[0];

    if (value === label) {
      // we can't add them manually for now
      return;
    } else {
      setSupplier(JSON.parse(value) as Supplier);
    }
  };

  useEffect(() => {
    if (!search || search.length < 2) {
      setAutocompleteOptions([]);
      return;
    }
    updateAutocomplete(search);
  }, [search]);

  const updateAutocomplete = async (search: string) => {
    const suppliers = await searchSuppliers(search);
    setAutocompleteOptions(
      suppliers.map((supplier) => ({
        value: JSON.stringify(supplier),
        label: `${supplier.firstName} ${supplier.lastName} - (${supplier.companyName})`,
      }))
    );
  };

  return (
    <>
      <MultiSelect
        options={autocompleteOptions}
        selection={[]}
        onSelectionChange={onAddSupplier}
        onInputChange={setSearch}
        value={search}
        placeholder="Choisir un fournisseur ..."
        leading={<SearchIcon className="w-4 h-4 text-muted-foreground" />}
        addLabel={`Ajouter "${search}"`}
      />
      {!!supplier && (
        <>
          <div className="flex flex-col gap-2 p-4 border border-border rounded-lg">
            {supplier.firstName} {supplier.lastName} - ({supplier.companyName})
          </div>
          <input type="hidden" name={name} value={supplier.id} />
        </>
      )}
    </>
  );
};
