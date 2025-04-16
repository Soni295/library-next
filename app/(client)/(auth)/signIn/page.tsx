'use client';

import axios, { AxiosError } from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { InputForm } from '@/app/ui/input/inputForm';
import { ResError } from '@/app/lib/definitions/response';
import { signIn } from 'next-auth/react';
import { CLIENT_PATH } from '@/app/lib/paths';
import { revalidatePath } from 'next/cache';
import { useState } from 'react';
import { toastErr, toastSuccess } from '@/app/ui/toast';
import clsx from 'clsx';
import { Spinner } from '@/app/ui/spinner';

const defaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};
type requestState = 'IDLE' | 'Loading' | 'Ok';

export default function SignUpPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });
  const [status, setStatus] = useState<requestState>('IDLE');

  const onSubmit = handleSubmit(async (data) => {
    setStatus('Loading');
    try {
      await axios.post('/api/auth/signUp', { ...data });

      const sign = await signIn('credentials', {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (sign?.error) {
        toast.error(sign.error, { className: 'bg-red-300', duration: 3000 });
        return;
      }

      toastSuccess('se ha creado exitosamente');
      setStatus('Ok');
      //revalidatePath(CLIENT_PATH.HOME, 'layout');
      router.push(CLIENT_PATH.HOME);
    } catch (err) {
      if (err instanceof AxiosError) {
        const data = err.response?.data as ResError;
        toastErr(data.errors[0].desc);
      }
      return;
    }
  });

  return (
    <div className="h-[calc(100vh-7rem)] flex flex-grow justify-center items-center">
      <form
        className="w-96 p-6 shadow-lg bg-white rounded-md"
        onSubmit={onSubmit}
      >
        <h2 className="text-3xl block text-center font-semibold mb-3">
          Registrarse
        </h2>
        <hr className="mb-3" />

        <InputForm
          label="Nombre:"
          type="text"
          err={errors.name}
          placeholder="Joe Doe"
          rest={register('name', {
            required: {
              value: true,
              message: 'El nombre es necesario.',
            },
            minLength: {
              value: 4,
              message: 'El nombre debe tener al menos 4 caracteres',
            },
            maxLength: {
              value: 50,
              message: 'El nombre debe tener hasta 50 caracteres',
            },
          })}
        />

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
          label="Contraseña:"
          type="password"
          err={errors.password}
          placeholder="*******"
          rest={register('password', {
            required: {
              value: true,
              message: 'La contraseña es necesaria.',
            },
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
            maxLength: {
              value: 20,
              message: 'La contraseña debe tener hasta 20 caracteres',
            },
          })}
        />
        <InputForm
          label="Repetir Contraseña:"
          type="password"
          err={errors.confirmPassword}
          placeholder="*******"
          rest={register('confirmPassword', {
            required: {
              value: true,
              message: 'La contraseña es necesaria.',
            },
            minLength: {
              value: 6,
              message: 'La contraseña debe tener al menos 6 caracteres',
            },
            maxLength: {
              value: 20,
              message: 'La contraseña debe tener hasta 20 caracteres',
            },
          })}
        />
        <div className="flex justify-center mt-5">
          <SignInButton status={status} />
        </div>
      </form>
    </div>
  );
}

function SignInButton({ status }: { status: requestState }) {
  const disable = status == 'Loading';

  const className = clsx(
    'border-2',
    'border-indigo-700 bg-indigo-700',
    'text-white',
    'rounded-lg',
    'py-1 px-5 w-full mt-3',
  );

  if (disable) return <Spinner />;

  return (
    <input
      aria-disabled={disable}
      disabled={disable}
      className={className}
      type="submit"
      value="Registrarse"
    />
  );
}
