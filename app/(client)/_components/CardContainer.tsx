import { Card, ClientProduct } from './Card';

export function CardConteiner({ elements }: CardContainerProps) {
  if (!elements || elements.length === 0) return <ProductsNotFound />;

  return (
    <div className="grid gap-4 mt-8 justify-items-center grid-cols-[repeat(auto-fill,minmax(18rem,1fr))]">
      {elements.map((element) => (
        <Card key={element.id} {...element} />
      ))}
    </div>
  );
}

function ProductsNotFound() {
  return (
    <div className="h-full w-full mt-20 md:text-5xl border-green-700 border-2  border-solid text-xl flex self-center justify-center">
      <p className="text-center text-inactive-light">
        No hay productos disponibles.
      </p>
    </div>
  );
}

interface CardContainerProps {
  elements: ClientProduct[] | null;
}
