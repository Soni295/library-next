import Link from 'next/link';

export function NotFound({
  status = '404',
  msg,
  msgLink = 'Volver',
  href,
}: NotFoundProps) {
  return (
    <main className="h-[calc(100vh-7rem)] flex justify-center items-center">
      <div className="text-center w-full text-slate-400">
        <h1 className="text-4xl">{status}</h1>
        <p className="text-2xl py-3">{msg}</p>
        <Link className="text-sky-400" href={href}>
          {msgLink}
        </Link>
      </div>
    </main>
  );
}

interface NotFoundProps {
  status?: string;
  msg: string;
  msgLink?: string;
  href: string;
}
