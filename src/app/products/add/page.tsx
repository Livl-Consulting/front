import { HeaderTitle } from "@/components/header-title";
import { ProductForm } from "./product-form";

export default function Page() {
  return (
    <div className="flex flex-col">
      <HeaderTitle title="Ajouter un produit" />
      <ProductForm />
    </div>
  );
}
