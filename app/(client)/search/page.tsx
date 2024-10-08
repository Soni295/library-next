import { productCtrl } from '@/app/lib/compose/inversify';
import { CardConteiner } from '../_components/CardContainer';
import { SearchParams } from '@/app/lib/definitions/SearchParams';

export default async function Search(searchParams: SearchParams) {
  const query = (searchParams.searchParams['q'] as string) || '';
  const tags = (searchParams.searchParams['tid'] as string) || '';
  //const tagIds = tags.split('_')
  console.log(searchParams);

  const productPage = await productCtrl.getProductsByFilterForClient({
    text: query,
  });
  return <CardConteiner elements={productPage.data} />;
}
