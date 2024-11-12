'use client';

import axios, { AxiosError } from 'axios';
import { useFormStatus } from 'react-dom';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { InputForm } from '@/app/ui/input/inputForm';
import { ResError } from '@/app/lib/definitions/response';
import { signIn } from 'next-auth/react';
import { CLIENT_PATH } from '@/app/lib/paths';

const defaultValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export default function SignUpPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
  });

  const onSubmit = handleSubmit(async (data) => {
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
      router.push(CLIENT_PATH.HOME);
    } catch (err) {
      if (err instanceof AxiosError) {
        const data = err.response?.data as ResError;
        toast.error(data.errors[0].desc, {
          className: 'bg-red-300',
          duration: 3000,
        });
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
        <div>
          <SignInButton />
        </div>
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
      value="Registrarse"
    />
  );
}
