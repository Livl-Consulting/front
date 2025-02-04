import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { labelsByProductsType } from "@/models/labels-by-products-type";
import { ProcessStatusBadge } from "@/components/process-status-badge";
import { HeaderTitle } from "@/components/header-title";

export default function HelpPage() {
  return (
    <div className="max-w-3xl mx-auto p-6">
      <HeaderTitle title="Aide & Documentation" />
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
            <AccordionItem value="item-12">
              <AccordionTrigger>La recette du poulet chasseur (le meilleur)</AccordionTrigger>
              <AccordionContent>
                Si vous aimez le poulet cacciatore, vous adorerez son cousin français, tout en sauce, nommé poulet
                chasseur. Cette recette qui provient de l’autre côté de l’Atlantique est un mets classique, copieux et
                rassasiant.
                <br/>
                <p className="font-bold text-xl pt-4">Ingrédients :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>375 ml (1 1/2 tasse) de bouillon de bœuf</li>
                  <li>14 g (1/2 oz) de bolets séchés</li>
                  <li>4 cuisses de poulet</li>
                  <li>15 ml (1 c. à soupe) d’huile d’olive</li>
                  <li>225 g (1/2 lb) de champignons blancs, coupés en quatre</li>
                  <li>225 g (1/2 lb) de pleurotes, émincés</li>
                  <li>30 ml (2 c. à soupe) de beurre</li>
                  <li>1 oignon, haché</li>
                  <li>2 gousses d’ail, hachées</li>
                  <li>30 ml (2 c. à soupe) de farine tout usage non blanchie</li>
                  <li>125 ml (1/2 tasse) de vin blanc sec</li>
                  <li>1 petite tomate, épépinée et coupée en dés</li>
                  <li>5 ml (1 c. à thé) d’estragon frais, ciselé</li>
                </ul>
                <p className="font-bold text-xl pt-4">Préparation :</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Dans une petite casserole, porter le bouillon à ébullition. Retirer du feu. Ajouter les bolets
                    séchés et laisser reposer 15 minutes pour réhydrater les champignons. Égoutter. Réserver le bouillon
                    et les champignons séparément.
                  </li>
                  <li>Entre-temps, retirer la peau des cuisses de poulet. À l’aide d’un couteau, couper les cuisses en
                    deux, en séparant les hauts de cuisses et les pilons.
                  </li>
                  <li>Dans une grande cocotte, à feu moyen-élevé, dorer le poulet dans l’huile de chaque côté. Saler et
                    poivrer. Réserver dans un bol. Déglacer la cocotte avec 60 ml (1/4 tasse) du bouillon en raclant le
                    fond à la cuillère de bois. Verser sur le poulet.
                  </li>
                  <li>Dans la même cocotte à feu moyen-élevé, dorer les champignons frais dans le beurre. Ajouter les
                    champignons réhydratés, l’oignon et l’ail. Poursuivre la cuisson 2 minutes. Saupoudrer de la farine
                    et bien enrober. Déglacer avec le vin et laisser réduire de moitié en remuant délicatement à l’aide
                    d’un fouet. Ajouter le reste du bouillon, la tomate et le poulet réservé. Porter à ébullition.
                    Couvrir et laisser mijoter 1 heure à feu doux.
                  </li>
                  <li>Retirer le couvercle, puis laisser réduire la sauce 5 minutes ou jusqu’à ce qu’elle nappe le dos
                    d’une cuillère. Rectifier l’assaisonnement. Ajouter l’estragon et servir avec des pâtes au beurre,
                    si désiré.
                  </li>
                </ul>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-13">
              <AccordionTrigger>Tier-list des élèves de la classe</AccordionTrigger>
              <AccordionContent>
                TODO !
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
    </div>
  );
}
