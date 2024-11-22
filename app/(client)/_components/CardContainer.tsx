import { Card } from './Card';

export function CardConteiner({ elements }: CardContainerProps) {
  if (!elements || elements.length === 0) return <ProductsNotFound />;

  return (
    <div className="mt-[8rem] grid gap-4 w-full mt-8 mx-[0.5rem] md:mx-[2rem] justify-items-center grid-cols-[repeat(auto-fill,minmax(15rem,1fr))]">
      {elements.map((element) => (
        <Card key={element.id} {...element} />
      ))}
    </div>
  );
}

function ProductsNotFound() {
  return (
    <div className="m-auto md:text-5xl text-xl flex self-center justify-center">
      <p className="flex-1 text-center text-inactive-light">
        No hay productos disponibles.
      </p>
    </div>
  );
}

interface CardContainerProps {
  elements?: Parameters<typeof Card>[0][];
}
