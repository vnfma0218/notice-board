'use client';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { increment } from '@/redux/features/counter/counterSlice';

export default function Home() {
  const count = useAppSelector((state) => state.counterReducer.value);
  const dispatch = useAppDispatch();
  console.log(process.env.NEXT_PUBLIC_API);
  return (
    <main className="">
      <h1>home</h1>
      <h3>counter : {count}</h3>

      <button
        onClick={() => {
          dispatch(increment());
        }}
      >
        increment
      </button>
    </main>
  );
}
