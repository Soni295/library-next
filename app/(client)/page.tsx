//import { productCtrl } from '../lib/compose/inversify';
import { CardConteiner } from './_components/CardContainer';
//import { getServerSession } from "next-auth";
export default async function Home() {
  //  const session = await getServerSession(authOptions);
  //const productPage = await productCtrl.getProductsByFilterForClient({});
  //  return <CardConteiner elements={productPage?.data?.info} />;
  return <CardConteiner elements={[]} />;
}

// cliente
/*
import { useSession } from "next-auth/react";
export function useCan(permission: string) {
  const { data: session } = useSession();
  return session?.user?.permissions?.includes(permission) ?? false;
}
*/
