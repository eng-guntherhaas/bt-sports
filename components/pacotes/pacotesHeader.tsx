import { Order } from "@/lib/getPacotesUi";
import PacotesOrderMenu from "@/components/pacotes/PacotesOrderMenu";

type Props = {
  order: Order;
};

export default function PacotesHeader({ order }: Props) {
  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <h1 className="text-xl sm:text-2xl font-bold text-default">
        Pacotes de Viagem
      </h1>

      <PacotesOrderMenu order={order} basePath="/pacotes" variant="public" />
    </div>
  );
}
