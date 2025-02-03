import { HeaderTitle } from "@/components/header-title";
import { SaleOrdersForm } from "./sale-orders-form";

export default function Page() {
  return (
    <div className="flex flex-col">
      <HeaderTitle title="Ajouter une commande de ventes" />
      <SaleOrdersForm />
    </div>
  );
}
