import { getSession } from '@/app/lib/session';
import { redirect } from 'next/navigation';
import { PATH } from '@/app/lib/paths';
import { orderCtrl } from '@/app/lib/compose/inversify';

export default async function CartPage() {
  const user = await getSession();
  if (!user) redirect(PATH.CLIENT.HOME);
  const a = await orderCtrl.getSelectionOrderByUserId({ id: user.id });
  //const cart = await OrderRepository.getLastOrderByUserId(user);
  //<Cart items={info.items} total={info.total} />
  return <main className="flex">Cart Page</main>;
}

interface PropInactivedMessage {
  msg: string;
}

function InactivedMessage({ msg }: PropInactivedMessage) {
  return (
    <div className="h-full w-full mt-20 md:text-5xl text-xl flex self-center justify-center">
      <p className="text-center  text-inactive-light">{msg}</p>
    </div>
  );
}
