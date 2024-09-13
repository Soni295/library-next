'use client';
import { useState } from 'react';
import { Card, CardProps } from './Card';

const mock: CardProps[] = [
  {
    id: '30',
    price: 100,
    saleType: 'venta por unidad',
    name: 'Marcadores maravilla',
    img: 'https://jit.com.ar/wp-content/uploads/2023/02/Lapicera-simball-dolche-Azul-4-1.jpg',
  },
  {
    id: '10',
    price: 200,
    saleType: 'venta por docena',
    name: 'Lapicera realmente lapicera',
    img: 'https://jit.com.ar/wp-content/uploads/2023/02/Lapicera-simball-dolche-Azul-4-1.jpg',
  },
  {
    id: '13',
    price: 200,
    saleType: 'venta por docena',
    name: 'Lapicera realmente lapicera',
    img: 'https://jit.com.ar/wp-content/uploads/2023/02/Lapicera-simball-dolche-Azul-4-1.jpg',
  },
  {
    id: '15',
    price: 200,
    saleType: 'venta por docena',
    name: 'Lapicera realmente lapicera',
    img: 'https://jit.com.ar/wp-content/uploads/2023/02/Lapicera-simball-dolche-Azul-4-1.jpg',
  },
];

export function CardContainer() {
  const [cards, setCards] = useState(mock);
  const style = {
    gridTemplateColumns: 'repeat(auto-fill, minmax(15rem, 1fr))',
  };
  return (
    <div className="grid gap-4 m-10 mt-8 md:mt-30" style={style}>
      {cards.map((card) => (
        <Card {...card} />
      ))}
    </div>
  );
}
