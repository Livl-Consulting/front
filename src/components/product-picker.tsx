import { FC, useEffect, useState } from "react";
import { SearchIcon, XIcon } from "lucide-react";
import { Product } from "@/models/product";
import { AutocompleteOption, MultiSelect } from "./ui/multi-select";
import { searchProducts } from "@/lib/actions/search-product.action";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { ProductType } from "@/models/product-type";

type Props = {
  name: string;
  initialProducts?: Product[];
  allowMultipleSelection?: boolean;
  allowQuantityEdit?: boolean;
  allowPriceEdit?: boolean;
  productType: ProductType;
};

export const ProductPicker: FC<Props> = ({
  name,
  initialProducts = [],
  allowMultipleSelection = false,
  allowQuantityEdit = true,
  allowPriceEdit = true,
  productType,
}) => {
  const [autocompleteOptions, setAutocompleteOptions] = useState<AutocompleteOption[]>([]);
  const [search, setSearch] = useState<string>("");
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const onAddProduct = (v: AutocompleteOption[]) => {
    if (!v.length) return;
    const { value, label } = v[0];

    if (value === label) return;
    const p = JSON.parse(value) as Product;
    if (p.type !== 'both' && p.type !== productType) return;

    setProducts(allowMultipleSelection ? [...products, p] : [p]);
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
      results
        .filter((product) => product.type === 'both' || product.type === productType)
        .map((product) => ({
          value: JSON.stringify(product),
          label: product.name,
        }))
    );
  };

  const inputProductName = (i: number) => {
    return allowMultipleSelection ? `${name}[${i}][id]` : name;
  }

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
      {products.length > 0 && (
        <div className="flex flex-col gap-2 p-4 border border-border rounded-lg">
          {products.map((product, i) => (
            
            <div key={`product:${product.id || product.name}`}>
              <div className="flex gap-2">
                <p className="text-lg truncate w-full">{product.name}</p>
                <Input type="hidden" 
                  id={allowMultipleSelection ? `${name}[${i}][id]` : "productId"}
                  defaultValue={product?.id} 
                  name={allowMultipleSelection ? `${name}[${i}][id]` : "productId"}
                />
                
                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${name}[${i}][quantity]`}>Quantité</Label>
                  <Input
                    type="number"
                    id={allowMultipleSelection ? `${name}[${i}][quantity]` : "quantity"}
                    defaultValue={1}
                    name={allowMultipleSelection ? `${name}[${i}][quantity]` : "quantity"}
                    min={0}
                    disabled={!allowQuantityEdit}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <Label htmlFor={`${name}[${i}][unit_price]`}>Prix par unité</Label>
                  <Input
                    type="number"
                    id={allowMultipleSelection ? `${name}[${i}][unit_price]` : "price"}
                    defaultValue={product?.price}
                    name={allowMultipleSelection ? `${name}[${i}][unit_price]` : "price"}
                    min={0}
                    disabled={!allowPriceEdit}
                  />
                </div>
                <Button variant="ghost" size="icon" onClick={() => setProducts(products.filter((a) => a !== product))}>
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
