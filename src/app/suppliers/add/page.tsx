import { HeaderTitle } from "@/components/header-title";
import { SupplierForm } from "./supplier-form";

export default function Page() {
  return (
    <div className="flex flex-col">
      <HeaderTitle title="Ajouter un fournisseur" />
      <SupplierForm />
    </div>
  );
}
