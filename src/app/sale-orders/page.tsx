import {
    TableCaption,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
    Table,
  } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { apiUrl } from "@/lib/utils";
import {ProcessStatusBadge} from "@/components/process-status-badge";
import { HeaderTitle } from "@/components/header-title";
import { SaleOrder } from "@/models/sale-order";
import { Button } from "@/components/ui/button";
import SaleOrderAction from "./sale-order-action";
import { FileText } from "lucide-react";
import { labelsBySaleOrderStatus } from "@/models/labels-by-sale-order-status";
import { formatDate } from "@/lib/date-utils";
  
  export default async function Page() {
    const response = await fetch(`${apiUrl()}/orders`, { cache: "no-cache" });
  
    if (!response.ok) {
      throw new Error(response.statusText);
    }
  
    const saleOrders = (await response.json()) as SaleOrder[];
  
    return (
      <>
        <HeaderTitle  title="Commandes de ventes" />
        <Table>
          <TableCaption>Vos commandes</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">N°</TableHead>
              <TableHead className="text-center">N° devis</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead>Client</TableHead>
              <TableHead>Produit</TableHead>
              <TableHead className="text-center">Prix</TableHead>
              <TableHead className="text-center">Confirmation de commande</TableHead>
              <TableHead className="text-center">Echéance</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {saleOrders.map((saleOrder) => (
              <TableRow key={saleOrder.id}>
                <TableCell className="text-center">{saleOrder.id}</TableCell>
                <TableCell className="text-center">{saleOrder.quoteId || '-'}</TableCell>
                <TableCell className="text-center">
                  <ProcessStatusBadge status={saleOrder.status} props={labelsBySaleOrderStatus[saleOrder.status]} />
                </TableCell>
                <TableCell className="font-medium">
                  {saleOrder.client.firstName} {saleOrder.client.lastName} ({saleOrder.client.companyName})
                </TableCell>
                <TableCell className="font-medium">{saleOrder.product.name}</TableCell>
                <TableCell className="text-center">{saleOrder.price}€</TableCell>
                <TableCell className="text-center">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="outline"><FileText /></Button>
                        </DialogTrigger>
                        <DialogContent className="max-w-3xl">
                            <DialogHeader>
                            <DialogTitle>Visionnage de la confirmation de commande</DialogTitle>
                            <DialogDescription>
                                La confirmation de commande est disponible en PDF pour téléchargement.
                            </DialogDescription>
                            </DialogHeader>
                            <iframe 
                            src={`${apiUrl()}/orders/generate-pdf/${saleOrder.id}`} 
                            className="w-full h-[80vh]"
                            />
                        </DialogContent>
                    </Dialog>
                </TableCell>
                <TableCell className="text-center">{formatDate(saleOrder.dueDate)}</TableCell>
                <TableCell>
                  <SaleOrderAction saleOrder={saleOrder} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
  