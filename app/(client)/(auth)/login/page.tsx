'use client';

import { CLIENT_PATH } from '@/app/lib/paths';
import { InputForm } from '@/app/ui/input/inputForm';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';

const defaultValues = {
  email: '',
  password: '',
};

export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = handleSubmit(async (data) => {
    const result = await signIn('credentials', {
      ...data,
      redirect: false,
    });

    if (result?.error) {
      toast.error(result.error, { className: 'bg-red-300', duration: 3000 });
      return;
    }
    router.push(CLIENT_PATH.HOME);
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-grow justify-center items-center">
      <form
        onSubmit={onSubmit}
        className="w-96 p-6 shadow-lg bg-white rounded-md"
      >
        <h2 className="text-3xl block text-center font-semibold mb-3">
          Conectarse
        </h2>
        <hr className="mb-3" />
        <InputForm
          label="Email:"
          type="email"
          err={errors.email}
          placeholder="joedoe@gmail.com"
          rest={register('email', {
            required: {
              value: true,
              message: 'El correo es necesario.',
            },
          })}
        />
        <InputForm
          label="Password:"
          type="password"
          err={errors.password}
          placeholder="*******"
          rest={register('password', {
            required: {
              value: true,
              message: 'La contraseña es necesaria.',
            },
          })}
        />
        <SignInButton />
      </form>
    </div>
  );
}

function SignInButton() {
  const { pending } = useFormStatus();

  return (
    <input
      aria-disabled={pending}
      className="border-2 border-indigo-700 bg-indigo-700 text-white py-1 px-5 w-full mt-3 rounded-lg"
      type="submit"
      value={pending ? 'Conectandose...' : 'Conectarse'}
    />
  );
}
