import { HeaderTitle } from "@/components/header-title";
import { PriceRequestForm } from "./price-requests-form";

export default function Page() {
  return (
    <div className="flex flex-col">
      <HeaderTitle goBackUrlLink="/price-requests" title="Ajouter une demande de prix" />
      <PriceRequestForm />
    </div>
  );
}
