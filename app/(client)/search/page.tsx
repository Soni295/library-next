import { productCtrl } from '@/app/lib/compose/inversify';
import { CardConteiner } from '../_components/CardContainer';
import { SearchParams } from '@/app/lib/definitions/SearchParams';

export default async function Search(searchParams: SearchParams) {
  const query = (searchParams.searchParams['q'] as string) || '';
  const tags = (searchParams.searchParams['tid'] as string) || '';

  //console.log(searchParams);

  const productPage = await productCtrl.getProductsByFilterForClient({
    text: query,
  });
  console.log({ productPage });
  return (
    <div className="flex flex-row bg-neutral-100 min-h-screen w-screen overflow-hidden">
      <SearchSideBar />
      <div className="flex-1">
        <CardConteiner elements={productPage.data.info} />
      </div>
    </div>
  );
}
export function SearchSideBar() {
  return (
    <div className="flex flex-col bg-neutral-100 border border-solid border-neutral-400 w-60 p-3">
      hola
    </div>
  );
}
