import { PriceRequestForm } from "./price-requests-form";

export default function Page() {
  return (
    <div className="flex flex-col gap-12 my-20">
      <h1 className="text-xl font-bold">Saisir une demande de prix</h1>
      <PriceRequestForm />
    </div>
  );
}
