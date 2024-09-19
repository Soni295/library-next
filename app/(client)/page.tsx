import { productCtrl } from '../lib/compose/inversify';
import { CardConteiner } from './_components/CardContainer';

export default async function Home() {
  const productPage = await productCtrl.getProductsByFilterForClient({
    text: '',
  });
  return <CardConteiner elements={productPage.data} />;
}
