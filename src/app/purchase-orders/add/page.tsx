import { HeaderTitle } from "@/components/header-title";
import { PurchaseOrdersForm } from "./purchase-orders-form";

export default function Page() {
  return (
    <div className="flex flex-col">
      <HeaderTitle goBackUrlLink="/purchase-orders" title="Ajouter une commande" />
      <PurchaseOrdersForm />
    </div>
  );
}
