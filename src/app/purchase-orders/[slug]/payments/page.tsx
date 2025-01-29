import { apiUrl } from "@/lib/utils";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table";
import { SupplierPaymentsForm } from "./supplier-payments-form";
import { SupplierPayment } from "@/models/supplier-payment";
import { PurchaseOrder } from "@/models/purchase-order";
import { labelsPaymentMethod } from "@/models/labels-by-method-payment";

export default async function Page({ params }: { params: Promise<{ slug: number }>}) {
  const orderPurchaseId = (await params).slug;

  const responsePurchaseOrder = await fetch(`${apiUrl()}/purchase-orders/${orderPurchaseId}`);
  if (!responsePurchaseOrder.ok) throw new Error(responsePurchaseOrder.statusText);

  const orderPurchase = await responsePurchaseOrder.json() as PurchaseOrder

  const response = await fetch(`${apiUrl()}/supplier-payments/purchase-order/${orderPurchase.id}`);
  if (!response.ok) throw new Error(response.statusText);

  const payments = await response.json() as SupplierPayment[];

  return (
    <div className="flex flex-col gap-8 mt-10">
      <h1 className="text-xl font-bold">Paiements pour la commande #{orderPurchase.id}</h1>
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
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total payé:</TableCell>
            <TableCell className="text-right">{payments.reduce((acc, payment) => acc + payment.amount, 0)} €</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={3}>Reste à payer:</TableCell>
            <TableCell className="text-right"><strong>{orderPurchase.products.reduce((acc, product) => acc + product.meta.pivot_quantity * product.meta.pivot_unit_price, 0) - payments.reduce((acc, payment) => acc + payment.amount, 0)} €</strong></TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      <SupplierPaymentsForm purchaseOrderId={orderPurchase.id} />
    </div>
  );
}
