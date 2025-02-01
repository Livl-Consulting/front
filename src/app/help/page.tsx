import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { labelsByProductsType } from "@/models/labels-by-products-type";
import { ProcessStatusBadge } from "@/components/process-status-badge";

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Aide & Documentation</h1>
      <Card>
        <CardContent>
          <p className="my-5">
            Bienvenue sur notre plateforme de gestion des ventes et achats. Cette section vous explique nos choix et comment utiliser l&apos;application efficacement.
          </p>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>Pourquoi cette application ?</AccordionTrigger>
              <AccordionContent>
                Cette application facilite la gestion des flux de vente et d&apos;achat en offrant une interface intuitive et un suivi précis des transactions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>Comment sont gérés les produits ?</AccordionTrigger>
              <AccordionContent>
                Un produit est défini par un nom, une description, un prix. Un produit est forcément associé à un statut en particulier tel que :
                
                <ul className="list-disc pl-4 space-y-2 my-3">
                  <li><strong>
                    <ProcessStatusBadge status="sale" props={labelsByProductsType["sale"]} />
                    </strong> : Produit destiné uniquement à la vente.
                 </li>
                  <li><strong>
                    <ProcessStatusBadge status="purchase" props={labelsByProductsType["purchase"]} />
                    </strong> : Produit destiné uniquement à l&apos;achat.
                 </li>
                  <li><strong>
                    <ProcessStatusBadge status="both" props={labelsByProductsType["both"]} />
                    </strong> : Produit destiné à la vente et à l&apos;achat.
                </li>
                </ul>

                Pour l&apos;instant, pour le flux Vente, vous pouvez juste ajouter <strong>un</strong> seul produit (pour les opportunités, devis et commande de ventes), et pour le flux Achat, vous pouvez ajouter <strong>plusieurs</strong> produits (pour les demandes de prix et commandes d&apos;achats). Un choix qui peut être modifié dans le futur en fonction des besoins.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>Comment sont gérés les clients et fournisseurs ?</AccordionTrigger>
              <AccordionContent>
                Les clients sont uniquement destiné au flux de Vente, et les fournisseurs au flux d&apos;Achat. Vous pouvez ajouter un client ou un fournisseur en renseignant les informations nécessaires.
                Chacun des deux ont les mêmes informations : nom, prénom, email, et entreprise.
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>Comment enregistrer une opportunité de vente ?</AccordionTrigger>
              <AccordionContent>
                Dans le module de vente, cliquez sur &quot;Nouvelle opportunité&quot;, sélectionnez un client, un produit et indiquez le pourcentage de réussite estimé.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5">
              <AccordionTrigger>Comment créer un devis ?</AccordionTrigger>
              <AccordionContent>
                Dans le module &quot;Devis de vente&quot;, cliquez sur &quot;Créer un devis&quot;, sélectionnez le client et le produit concerné, puis définissez le prix du devis. Sa quantité n&apos;est pas ajustable et sera fixée à 1.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-6">
              <AccordionTrigger>Quels sont les statuts disponibles ?</AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-4">
                  <li><strong>Opportunités & Devis :</strong> En cours, Validé, Annulé.</li>
                  <li><strong>Commandes de vente :</strong> En cours, Livrée, Facturée, Annulée.</li>
                  <li><strong>Commandes d&apos;achat :</strong> En cours, Réceptionnée, Facturée, Annulée.</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-7">
              <AccordionTrigger>Comment générer un document PDF depuis une commande ?</AccordionTrigger>
              <AccordionContent>
                Pour chaque commande, soit de vente ou d&apos;achat, vous pouvez générer un document PDF en cliquant sur &quot;Bon de commande&quot; ou &quot;Confirmation de commande&quot;
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-8">
              <AccordionTrigger>Comment effectuer ou consulter mes paiements ?</AccordionTrigger>
              <AccordionContent>
                Pour accédez aux paiements (de ventes ou achat), cliquez sur &quot;Effectuer un paiement&quot; / &quot;Saisir règlement de ventes&quot; sur le bouton d&apos;action de la page qui affiche la liste des commandes.

                Pour effectuer un paiement, vous devez saisir le montant et la date du paiement, et choisissez le mode de paiement (virement, carte, chèque). Vous pouvez effectuer autant de paiements que nécessaire. Une fois la commande entièrement payée, elle sera marquée comme &quot;Facturée&quot;. 
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-9">
              <AccordionTrigger>Comment gérer une demande de prix ?</AccordionTrigger>
              <AccordionContent>
                Dans le module &quot;Demandes de prix&quot;, saisissez une nouvelle demande en sélectionnant un fournisseur et les articles souhaités. Vous pouvez transformer cette demande en commande d&apos;achat.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-10">
              <AccordionTrigger>Puis-je mettre n&apos;importe quel prix quand je choisis un produit ?</AccordionTrigger>
              <AccordionContent>
                Que se soit pour le module de Vente (opportunité, devis et commande) ainsi que le module d&apos;Achat (demande de prix et commande), le prix n&apos;est pas fixé et vous pouvez le modifier à votre guise. Cette fonctionnalité peut être modifiée dans le futur en fonction des besoins, mais nous avions pensé que cela pourrait être utile pour des négociations de prix. Néanmoins, lors d&apos;une transformation de devis en commande de ventes, ou de demande de prix en commande d&apos;achats, le prix du produit sera automatiquement repris.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-11">
              <AccordionTrigger>Transformer une opportunité, un devis ou une demande de prix en commande</AccordionTrigger>
              <AccordionContent>
                Pour transformer une opportunité, un devis ou une demande de prix en commande (de vente ou achat), cliquez sur &quot;Transformer en commande&quot; qui se trouve dans le bouton d&apos;action de chaque élément.
                Par exemple, pour transformer un devis en commande de vente, rendez-vous sur la page des devis, cliquez sur le bouton d&apos;action &quot;Transformer en commande&quot; du devis souhaité, et le devis sera automatiquement transformé en commande de vente avec les mêmes informations.
                </AccordionContent> 
              </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
