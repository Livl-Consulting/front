import { Client } from "@/models/client";
import { FC, useEffect, useState } from "react";
import { AutocompleteOption, MultiSelect } from "./ui/multi-select";
import { searchClients } from "@/lib/actions/search-clients.action";
import { SearchIcon } from "lucide-react";

type Props = {
  name: string;
  initialClient?: Partial<Client>;
};

export const ClientPicker: FC<Props> = ({ name, initialClient }) => {
  const [autocompleteOptions, setAutocompleteOptions] = useState<
    AutocompleteOption[]
  >([]);

  const [search, setSearch] = useState<string>("");
  const [client, setClient] = useState<Partial<Client> | undefined>(
    initialClient
  );

  const onAddClient = (v: AutocompleteOption[]) => {
    if (!v.length) {
      return;
    }

    const { value, label } = v[0];

    if (value === label) {
      // we can't add them manually for now
      return;
    } else {
      setClient(JSON.parse(value) as Client);
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
    const clients = await searchClients(search);
    setAutocompleteOptions(
      clients.map((client) => ({
        value: JSON.stringify(client),
        label: `${client.firstName} ${client.lastName}`,
      }))
    );
  };

  return (
    <>
      <MultiSelect
        options={autocompleteOptions}
        selection={[]}
        onSelectionChange={onAddClient}
        onInputChange={setSearch}
        value={search}
        placeholder="Choisir un client ..."
        leading={<SearchIcon className="w-4 h-4 text-muted-foreground" />}
        addLabel={`Ajouter "${search}"`}
      />
      {!!client && (
        <>
          <div className="flex flex-col gap-2 p-4 border border-border rounded-lg">
            {client.firstName} {client.lastName}
          </div>
          <input type="hidden" name={name} value={client.id} />
        </>
      )}
    </>
  );
};
