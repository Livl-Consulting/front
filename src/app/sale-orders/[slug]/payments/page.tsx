import { apiUrl } from "@/lib/utils";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table";
import { labelsPaymentMethod } from "@/models/labels-by-method-payment";
import { HeaderTitle } from "@/components/header-title";
import { SaleOrder } from "@/models/sale-order";
import { ClientPayment } from "@/models/client-payment";
import { ClientPaymentsForm } from "./client-payments-form";

export default async function Page({ params }: { params: Promise<{ slug: number }>}) {
  const saleOrderId = (await params).slug;

  const responseSaleOrder = await fetch(`${apiUrl()}/orders/${saleOrderId}`);
  if (!responseSaleOrder.ok) throw new Error(responseSaleOrder.statusText);

  const orderSale = await responseSaleOrder.json() as SaleOrder

  const response = await fetch(`${apiUrl()}/client-payments/sale-order/${orderSale.id}`);
  if (!response.ok) throw new Error(response.statusText);

  const payments = await response.json() as ClientPayment[];

  const totalAmount = orderSale.product.price;
  const totalPaid = payments.reduce((acc, payment) => acc + payment.amount, 0);
  const totalDue = totalAmount - totalPaid;

  return (
    <div className="flex flex-col gap-8 ">
      <HeaderTitle title={`Paiment client de la commande n°${orderSale.id}`} />
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
              <p>Le client doit encore payer {totalDue}€</p>
            </div>
            <h2 className="text-lg font-semibold">Ajouter un paiement</h2>
            <ClientPaymentsForm saleOrderId={orderSale.id} totalDue={totalDue} />
          </div>
        )
      }
    </div>
  );
}
