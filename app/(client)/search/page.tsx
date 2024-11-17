import { productCtrl } from '@/app/lib/compose/inversify';
import { CardConteiner } from '../_components/CardContainer';
import { SearchParams } from '@/app/lib/definitions/SearchParams';
import { Sidebar } from './sidebar';

export default async function Search(searchParams: SearchParams) {
  const query = (searchParams.searchParams['q'] as string) || '';
  const tags = (searchParams.searchParams['tid'] as string) || '';

  const productPage = await productCtrl.getProductsByFilterForClient({
    text: query,
  });

  let tid: number[] = [];
  if (Array.isArray(tags)) {
    tid = tags.map((t) => Number(t)).filter((t) => !Number.isNaN(t));
  }

  return (
    <div className="flex flex-row bg-neutral-100 min-h-screen w-screen overflow-hidden">
      <Sidebar categories={productPage.data.categories} tIds={tid} />
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
