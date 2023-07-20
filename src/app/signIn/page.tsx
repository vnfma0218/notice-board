'use client';
import { login } from '@/api/login';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import useSWR from 'swr';

interface ILoginForm {
  email: string;
  password: string;
}
export default function LoginPage() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginForm>();
  const { mutate } = useSWR('/profile');

  const [customErrors, setCustomErrors] = useState({
    hasError: false,
    meassage: '이메일 혹은 비밀번호를 확인해주세요',
  });

  const submitForm: SubmitHandler<ILoginForm> = (data: ILoginForm) => {
    login({ email: data.email, password: data.password }).then((res) => {
      if (res.resultCode === 4004) {
        setCustomErrors((prev) => ({ ...prev, hasError: true }));
      } else {
        setCustomErrors((prev) => ({ ...prev, hasError: false }));
        mutate();
        router.push('/');
      }
    });
  };

  return (
    <main className="flex min-h-screen flex-col items-center space-y-10 p-24">
      <h1 className="text-4xl font-semibold">로그인</h1>
      <form onSubmit={handleSubmit(submitForm)}>
        <label
          htmlFor="email"
          className="block text-sm text-gray-800 dark:text-gray-200"
        >
          Email
        </label>

        <div className="mt-1">
          <input
            id="email"
            {...register('email', {
              required: {
                value: true,
                message: '이메일을 입력해주세요.',
              },
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: '올바른 이메일 형식을 입력해주세요',
              },
            })}
            className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
          />
          <p className="ml-1 text-red-400">{errors.email?.message}</p>
        </div>
        <div className="mt-4">
          <label
            htmlFor="password"
            className="block text-sm text-gray-800 dark:text-gray-200"
          >
            Password
          </label>
          <div className="mt-1">
            <input
              type="password"
              id="password"
              {...register('password', {
                required: {
                  value: true,
                  message: '비밀번호를 입력해주세요.',
                },
              })}
              className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
            />
            <p className="ml-1 text-red-400">{errors.password?.message}</p>
          </div>
        </div>
        <button className="mt-6 w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none">
          로그인
        </button>
        <p
          className="mt-1 text-right text-sm cursor-pointer text-blue-400"
          onClick={() => {
            router.push('/signup');
          }}
        >
          회원가입하기
        </p>

        {customErrors.hasError ? (
          <p className="ml-1 text-red-400">{customErrors.meassage}</p>
        ) : null}

        {/* 소셜 로그인 */}
        <div className="text-center mt-10">
          <p>소셜로그인</p>
          <button
            onClick={() => {
              window.location.href =
                'https://kauth.kakao.com/oauth/authorize?client_id=' +
                process.env.NEXT_PUBLIC_KAKAO_REST_KEY +
                '&redirect_uri=' +
                encodeURIComponent(`http://localhost:8080/user/auth/kakao`) +
                '&response_type=code';
            }}
            className="btn w-full bg-yellow-300"
          >
            kakao
          </button>
        </div>
      </form>
    </main>
  );
}
