'use client';
import { signup } from '@/api/login';
import MessageModal from '@/components/MessageModal';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface ILoginForm {
  email: string;
  nickname: string;
  password: string;
}
export default function SignupPage() {
  const router = useRouter();
  const passwordChkRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ILoginForm>();
  const [customErrors, setCustomErrors] = useState({
    hasError: false,
    meassage: '비밀번호가 일치하지 않습니다.',
  });
  const [modalInfo, setModalInfo] = useState({
    title: '',
    message: '',
    hasConfirm: true,
  });

  const onSuccessSignup = () => {
    router.push('/signin');
  };

  const submitForm: SubmitHandler<ILoginForm> = (data: ILoginForm) => {
    if (data.password !== passwordChkRef.current?.value) {
      return setCustomErrors((prev) => ({ ...prev, hasError: true }));
    }
    setCustomErrors((prev) => ({ ...prev, hasError: false }));
    signup({
      email: data.email,
      password: data.password,
      nickname: data.nickname,
    })
      .then((res) => {
        // 성공하면 모달창 띄우고 로그인 페이지로
        console.log('res', res);
        if (res.resultCode === 2000) {
          setModalInfo({
            title: '회원가입 완료',
            message: '다시 로그인 해주세요',
            hasConfirm: true,
          });
          window.message_modal.show();
        }
        if (res.resultCode === 4009) {
          setModalInfo({
            title: '안내',
            message: res.message,
            hasConfirm: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <main className="flex min-h-screen flex-col items-center space-y-10 p-24">
      <h1 className="text-4xl font-semibold">회원가입</h1>
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
            htmlFor="nickname"
            className="block text-sm text-gray-800 dark:text-gray-200"
          >
            Nickname
          </label>

          <div className="mt-1">
            <input
              id="nickname"
              {...register('nickname', {
                required: {
                  value: true,
                  message: '닉네임을 입력해주세요.',
                },
              })}
              className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
            />
            <p className="ml-1 text-red-400">{errors.nickname?.message}</p>
          </div>
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
        <div className="mt-4">
          <label
            htmlFor="passwordChk"
            className="block text-sm text-gray-800 dark:text-gray-200"
          >
            Password Check
          </label>
          <div className="mt-1">
            <input
              ref={passwordChkRef}
              type="password"
              id="passwordChk"
              className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
            />
            {customErrors.hasError ? (
              <p className="ml-1 text-red-400">{customErrors.meassage}</p>
            ) : null}
          </div>
        </div>

        <button
          type="submit"
          className="mt-6 w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
        >
          회원가입
        </button>
        <p
          className="mt-1 text-right text-sm cursor-pointer text-blue-400"
          onClick={() => {
            router.push('/signin');
          }}
        >
          로그인하기
        </p>

        {/* 소셜 로그인 */}
        <div className="text-center mt-10">
          <p>소셜로그인</p>
          <button className="btn w-full bg-yellow-300">kakao</button>
        </div>
      </form>

      <MessageModal
        title={modalInfo.title}
        message={modalInfo.message}
        hasConfirm={modalInfo.hasConfirm}
        confirmBtnClickCb={onSuccessSignup}
      />
    </main>
  );
}
