import { FC, useEffect, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { Product } from "@/models/product";
import { AutocompleteOption, MultiSelect } from "./ui/multi-select";
import { searchProducts } from "@/lib/actions/search-product.action";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";

type Props = {
  name: string;
  initialProducts?: Product[];
};

export const ProductPicker: FC<Props> = ({ name, initialProducts }) => {
  const [autocompleteOptions, setAutocompleteOptions] = useState<
    AutocompleteOption[]
  >([]);

  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>(initialProducts ?? []);

  const onAddProduct = (v: AutocompleteOption[]) => {
    if (!v.length) {
      return;
    }

    const { value, label } = v[0];

    if (value === label) {
      // can't handle manual input for now
      return;
    } else {
      const p = JSON.parse(value) as Product;
      setProducts([...products, p]);
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
    const results = await searchProducts(search);

    setAutocompleteOptions(
      results.map((product) => ({
        value: JSON.stringify(product),
        label: product.name,
      }))
    );
  };

  return (
    <>
      <MultiSelect
        options={autocompleteOptions}
        selection={[]}
        onSelectionChange={onAddProduct}
        onInputChange={setSearch}
        value={search}
        placeholder="Ajouter un produit ..."
        leading={<SearchIcon className="w-4 h-4 text-muted-foreground" />}
        addLabel={`Ajouter "${search}"`}
      />
      {products?.length > 0 && (
        <div className="flex flex-col gap-2 p-4 border border-border rounded-lg">
          {products.map((product, i) => (
            <div key={`product:${product.id || product.name}`}>
              <div className="flex gap-2">
                <p className="text-lg truncate w-full">{product.name}</p>
                <input
                  type="hidden"
                  id={`${name}[${i}][id]`}
                  defaultValue={product?.id}
                  name={`${name}[${i}][id]`}
                />

                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${name}[${i}][id]`}>Quantité</Label>
                  <Input
                    type="number"
                    id={`${name}[${i}][quantity]`}
                    defaultValue={1}
                    name={`${name}[${i}][quantity]`}
                    min={0}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${name}[${i}][id]`}>Prix par unité</Label>
                  <Input
                    type="number"
                    id={`${name}[${i}][unit_price]`}
                    defaultValue={product?.price}
                    name={`${name}[${i}][unit_price]`}
                    min={0}
                  />
                </div>
                <Button
                  variant="ghost"
                  size={"icon"}
                  onClick={() => {
                    setProducts(products.filter((a) => a !== product));
                  }}
                >
                  <XIcon size={24} />
                </Button>
              </div>
              {i < products.length - 1 && <Separator className="my-5" />}
            </div>
          ))}
        </div>
      )}
    </>
  );
};
