import { HeaderTitle } from "@/components/header-title";
import { QuoteForm } from "./quote-form";

export default function Page() {
  return (
    <div className="flex flex-col">
      <HeaderTitle goBackUrlLink="/quotes" title="Créer un devis" />
      <QuoteForm />
    </div>
  );
}
