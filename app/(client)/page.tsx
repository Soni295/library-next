import { productCtrl } from '../lib/compose/inversify';
import { importar } from '../lib/utils/importInfo';
import { CardConteiner } from './_components/CardContainer';

export default async function Home() {
  const productPage = await productCtrl.getProductsByFilterForClient({});
  await importar();

  return <CardConteiner elements={productPage.data.info} />;
}
