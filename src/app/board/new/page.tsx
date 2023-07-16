'use client';
import { savePost } from '@/api/post';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IPostForm {
  title: string;
  content: string;
}

export default function NewBoard() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IPostForm>();

  const [loading, setLoading] = useState(false);
  const submitForm = async (data: IPostForm) => {
    if (loading) return;
    setLoading(true);
    try {
      const res = await savePost({ title: data.title, content: data.content });

      if (res.id) {
        router.replace(`/board/${res.id}`);
      }
    } catch (error) {
      console.log('error', error);
    }
    setLoading(false);
  };
  return (
    <main className="max-w-3xl m-auto px-10">
      <form onSubmit={handleSubmit(submitForm)} className="mt-20 mb-10">
        <div>
          <label htmlFor="title">제목</label>
          <input
            id="title"
            {...register('title', {
              required: {
                value: true,
                message: '제목은 5~20자까지 입력해주세요',
              },
              minLength: {
                value: 5,
                message: '제목은 5~20자까지 입력해주세요',
              },
              maxLength: {
                value: 20,
                message: '제목은 5~20자까지 입력해주세요',
              },
            })}
            type="text"
            placeholder="Type here"
            className="input input-bordered input-md w-full mt-1"
          />
          <p className="ml-1 text-red-400">{errors.title?.message}</p>

          <label htmlFor="content" className="block mt-10">
            내용
          </label>
          <textarea
            id="content"
            {...register('content', {
              required: {
                value: true,
                message: '내용은 필수 입력사항 입니다.',
              },
              maxLength: {
                value: 200,
                message: '내용은 최대 200자 까지 작성 가능합니다.',
              },
            })}
            className="textarea textarea-bordered textarea-lg  w-full"
            placeholder="내용을 입력해주세요"
          ></textarea>
          <p className="ml-1 text-red-400">{errors.content?.message}</p>
        </div>
        <div className="flex justify-end mt-10">
          <button
            onClick={() => {
              router.back();
            }}
            className="btn btn-outline border-gray-300 px-7 btn-sm mr-3"
          >
            취소
          </button>

          <button type="submit" className="btn btn-info px-7 btn-sm text-white">
            {loading ? (
              <span className="loading loading-spinner loading-md"></span>
            ) : (
              '등록'
            )}
          </button>
        </div>
      </form>
    </main>
  );
}
