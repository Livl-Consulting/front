import { SupplierForm } from "./supplier-form";

export default function Page() {
  return (
    <div className="flex flex-col gap-12 my-20">
      <h1 className="text-xl font-bold">Ajouter un fournisseur</h1>
      <SupplierForm />
    </div>
  );
}
