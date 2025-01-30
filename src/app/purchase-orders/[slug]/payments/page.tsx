import { apiUrl } from "@/lib/utils";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table";
import { SupplierPaymentsForm } from "./supplier-payments-form";
import { SupplierPayment } from "@/models/supplier-payment";
import { PurchaseOrder } from "@/models/purchase-order";
import { labelsPaymentMethod } from "@/models/labels-by-method-payment";
import { HeaderTitle } from "@/components/header-title";

export default async function Page({ params }: { params: Promise<{ slug: number }>}) {
  const orderPurchaseId = (await params).slug;

  const responsePurchaseOrder = await fetch(`${apiUrl()}/purchase-orders/${orderPurchaseId}`);
  if (!responsePurchaseOrder.ok) throw new Error(responsePurchaseOrder.statusText);

  const orderPurchase = await responsePurchaseOrder.json() as PurchaseOrder

  const response = await fetch(`${apiUrl()}/supplier-payments/purchase-order/${orderPurchase.id}`);
  if (!response.ok) throw new Error(response.statusText);

  const payments = await response.json() as SupplierPayment[];

  const totalAmount = orderPurchase.products.reduce((acc, product) => acc + product.meta.pivot_quantity * product.meta.pivot_unit_price, 0);
  const totalPaid = payments.reduce((acc, payment) => acc + payment.amount, 0);
  const totalDue = totalAmount - totalPaid;

  return (
    <div className="flex flex-col gap-8 ">
      <HeaderTitle title={`Paiment commande n°${orderPurchase.id}`} />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Méthode</TableHead>
            <TableHead>Notes</TableHead>
            <TableHead>Date du paiement</TableHead>
            <TableHead className="text-right">Montant</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {payments.map((payment) => (
            <TableRow key={payment.id}>
              <TableCell>{labelsPaymentMethod[payment.paymentMethod]}</TableCell>
              <TableCell>{payment.notes || "—"}</TableCell>
              <TableCell>{payment.paymentDate}</TableCell>
              <TableCell className="text-right">{payment.amount} €</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3}>Total payé:</TableCell>
            <TableCell className="text-right">{totalPaid} €</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {
        totalDue === 0 && (
          <div className="bg-green-100 text-green-800 p-4 rounded-lg">
            <p>La commande est entièrement payée</p>
          </div>
        )
      } 
      {
        totalDue > 0 && (
          <div className="flex flex-col gap-6">
            <div className="bg-red-100 text-red-800 p-4 rounded-lg">
              <p>Il reste {totalDue}€ à payer, donc hop on se bouge !</p>
            </div>
            <h2 className="text-lg font-semibold">Ajouter un paiement</h2>
            <SupplierPaymentsForm purchaseOrderId={orderPurchase.id} totalDue={totalDue} />
          </div>
        )
      }
    </div>
  );
}
