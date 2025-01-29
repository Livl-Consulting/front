import { PurchaseOrdersForm } from "./purchase-orders-form";

export default function Page() {
  return (
    <div className="flex flex-col gap-12 my-20">
      <h1 className="text-xl font-bold">Saisir une nouvelle commande</h1>
      <PurchaseOrdersForm />
    </div>
  );
}
