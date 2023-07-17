'use client';
import Image from 'next/image';
import { deleteComment, getPostDetail } from '@/api/post';
import { useRouter } from 'next/navigation';
import NewComment from '@/components/board/Comment/NewComment';
import useSWR from 'swr';
import CommentList from '@/components/board/Comment/CommentList';
import MessageModal from '@/components/MessageModal';
import { useState } from 'react';

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
  const [selectedCommentId, setSelectedCommentId] = useState('');
  const { data, isLoading, mutate } = useSWR(`/post/${params.id}`, () =>
    getPostDetail(params.id)
  );
  const onPostComment = () => {
    mutate();
  };
  const onShowDelCommentModal = (commentId: string) => {
    window.message_modal.show();
    setSelectedCommentId(commentId);
  };
  const onConfirmDeleteComment = () => {
    console.log('commentId', selectedCommentId);
    deleteComment(selectedCommentId, params.id).then((res) => {
      console.log(res);
      if (res.resultCode === 2000) {
        mutate();
      }
    });
  };
  if (isLoading) {
    return (
      <span className="loading loading-spinner loading-lg absolute top-1/2 left-1/2"></span>
    );
  }
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
          <p className="mt-3 text-2xl">{data?.title}</p>
          <label htmlFor="content" className="block mt-10">
            내용
          </label>
          <p className="mt-3 ">{data?.content}</p>
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
          {data?.isMine ? (
            <button className="btn btn-outline px-7 btn-sm">수정</button>
          ) : null}
        </div>
      </div>
      <NewComment onPostComment={onPostComment} />
      <CommentList
        onDeleteComment={onShowDelCommentModal}
        comments={data?.comment ?? []}
      />
      <MessageModal
        title="삭제"
        message="정말 삭제하시겠습니까?"
        hasConfirm={true}
        confirmBtnClickCb={onConfirmDeleteComment}
      />
    </main>
  );
}
