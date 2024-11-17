export interface ClientProductProps {
  id: number;
  name: string;
  photo?: string;
  price: number;
}

export type CardImageProps = Pick<ClientProductProps, 'photo' | 'name'>;
