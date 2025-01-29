import { apiUrl } from "@/lib/utils";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { SupplierPaymentsForm } from "./supplier-payments-form";
import { SupplierPayment } from "@/models/supplier-payment";
import { PurchaseOrder } from "@/models/purchase-order";
import { labelsPaymentMethod } from "@/models/labels-by-method-payment";

export default async function Page({ params }: { params: Promise<{ id: string }>}) {
  const orderPurchaseId = (await params).id;

  const response = await fetch(`${apiUrl()}/supplier-payments/purchase-order/${orderPurchaseId}`);
  if (!response.ok) throw new Error(response.statusText);

  const payments = await response.json() as SupplierPayment[];

  return (
    <div className="flex flex-col gap-8 mt-10">
      <h1 className="text-xl font-bold">Paiements pour la commande #{orderPurchaseId}</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Montant</TableHead>
            <TableHead>Méthode</TableHead>
            <TableHead>Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{payment.amount} €</TableCell>
              <TableCell>{labelsPaymentMethod[payment.paymentMethod]}</TableCell>
              <TableCell>{payment.notes || "—"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <SupplierPaymentsForm purchaseOrderId={orderPurchaseId} />
    </div>
  );
}
