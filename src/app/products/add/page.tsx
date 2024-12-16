import { ProductForm } from "./product-form";

export default function Page() {
  return (
    <div className="flex flex-col gap-12 my-20">
      <h1 className="text-xl font-bold">Ajouter un produit</h1>
      <ProductForm />
    </div>
  );
}
