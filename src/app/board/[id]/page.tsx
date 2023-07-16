'use client';
import Image from 'next/image';
import { getPostDetail } from '@/api/post';
import { IPost } from '@/lib/types/post';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';

interface IPostForm {
  email: string;
  password: string;
}

export default function BoardDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IPostForm>();

  const [post, setPost] = useState<IPost>();

  useEffect(() => {
    const fetchPost = async () => {
      const post = await getPostDetail(params.id);
      setPost(post);
    };
    if (params.id) {
      fetchPost();
    }
  }, []);
  return (
    <main className="max-w-3xl m-auto px-10">
      <div className="mt-20 mb-10 relative">
        <div>
          <div className="absolute right-0 cursor-pointer">
            <Image
              priority
              src="/images/more_btn.svg"
              height={32}
              width={32}
              alt="MoreButton"
            />
          </div>

          <label htmlFor="title">제목</label>
          <p className="mt-3 text-2xl">{post?.title}</p>
          <label htmlFor="content" className="block mt-10">
            내용
          </label>
          <p className="mt-3 ">{post?.content}</p>
        </div>
        <div className="flex justify-end mt-10">
          <button
            onClick={() => {
              router.back();
            }}
            className="btn btn-outline border-gray-300 px-7 btn-sm mr-3"
          >
            목록
          </button>
          {post?.isMine ? (
            <button className="btn btn-outline px-7 btn-sm">수정</button>
          ) : null}
        </div>
      </div>
    </main>
  );
}
