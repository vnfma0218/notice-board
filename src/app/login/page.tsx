'use client';
import { signup } from '@/api/login';
import { signIn } from 'next-auth/react';
import { useRef, useState } from 'react';

const LoginPage = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordCheckRef = useRef(null);

  // 수정된 부분
  const handleSubmit = async () => {
    if (isLoginMode) {
      const result = await signIn('credentials', {
        email: emailRef.current,
        password: passwordRef.current,
        redirect: true,
        callbackUrl: '/',
      });
    } else {
      signup({ email: emailRef.current!, password: passwordRef.current! }).then(
        (res) => {
          console.log(res);
        }
      );
    }
  };

  const toggleMode = () => {
    setIsLoginMode((prev) => !prev);
  };

  return (
    <main className="flex min-h-screen flex-col items-center space-y-10 p-24">
      <h1 className="text-4xl font-semibold">
        {isLoginMode ? 'Log in' : 'Sign Up'}
      </h1>
      <div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm text-gray-800 dark:text-gray-200"
          >
            Email
          </label>

          <div className="mt-1">
            <input
              ref={emailRef}
              onChange={(e: any) => {
                emailRef.current = e.target.value;
              }}
              id="email"
              name="email"
              type="email"
              required
              autoFocus={true}
              className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
            />
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
              name="password"
              ref={passwordRef}
              onChange={(e: any) => (passwordRef.current = e.target.value)}
              className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
            />
          </div>
        </div>

        {!isLoginMode ? (
          <div className="mt-4">
            <label
              htmlFor="password"
              className="block text-sm text-gray-800 dark:text-gray-200"
            >
              Password Check
            </label>
            <div className="mt-1">
              <input
                type="password"
                id="password"
                name="password"
                ref={passwordCheckRef}
                onChange={(e: any) =>
                  (passwordCheckRef.current = e.target.value)
                }
                className="mt-2 block w-full rounded-md border bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>
          </div>
        ) : null}

        <div className="mt-6 text-right">
          <button
            onClick={handleSubmit}
            className="w-full transform rounded-md bg-gray-700 px-4 py-2 tracking-wide text-white transition-colors duration-200 hover:bg-gray-600 focus:bg-gray-600 focus:outline-none"
          >
            {isLoginMode ? '로그인' : '회원가입'}
          </button>
          <p className="mt-1 text-blue-400" onClick={toggleMode}>
            {isLoginMode ? '회원가입하기' : '로그인하기'}
          </p>
        </div>
      </div>
    </main>
  );
};
export default LoginPage;
