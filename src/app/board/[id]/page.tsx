'use client';
import dynamic from 'next/dynamic';

import Image from 'next/image';
import { deleteComment, deleteLike, getPostDetail, postLike } from '@/api/post';
import { useRouter } from 'next/navigation';
import NewComment from '@/components/board/Comment/NewComment';
import useSWR from 'swr';
import CommentList from '@/components/board/Comment/CommentList';
import MessageModal from '@/components/MessageModal';
import { useMemo, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { showModal } from '@/redux/features/modal/modalSlice';
import UserAvatar from '@/components/UserAvatar';
import { elapsedTime } from '@/lib/utils/common';

export default function BoardDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const isLogin = useAppSelector((state) => state.userReducer.isLoggedIn);
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const [selectedCommentId, setSelectedCommentId] = useState('');
  const { data, isLoading, mutate } = useSWR(`/post/${params.id}`, () =>
    getPostDetail(params.id)
  );
  const onPostComment = () => {
    mutate();
  };
  const onShowDelCommentModal = (commentId: string) => {
    setSelectedCommentId(commentId);

    dispatch(
      showModal({
        title: '삭제',
        message: '정말 삭제하시겠습니까?',
        hasConfirm: true,
        confirmCallback: onConfirmDeleteComment,
      })
    );
  };
  const onConfirmDeleteComment = () => {
    if (!selectedCommentId) return;
    deleteComment(selectedCommentId, params.id).then((res) => {
      console.log(res);
      if (res.resultCode === 2000) {
        mutate();
      }
    });
  };
  const onSuccessUpdateComment = () => {
    mutate();
  };
  const onEditPost = () => {
    router.push(`/board/edit/${params.id}`);
  };

  const onToggleLikePost = async () => {
    let result = null;
    if (data?.isLiked) {
      // 좋아요 취소
      result = await deleteLike(params.id);
    } else {
      // 좋아요
      result = await postLike(params.id);
    }
    if (result.resultCode === 2000) {
      mutate();
    }
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
          <div className="flex mb-5">
            <div className="w-10 h-10 mr-2">
              <UserAvatar url={data?.user?.avatar} alt={data?.user?.nickname} />
            </div>
            <div>
              <p className="text-sm">{data?.user.nickname}</p>
              <p className="text-sm">{elapsedTime(data?.createdAt ?? '')}</p>
            </div>
          </div>

          <p className="mb-10 text-2xl md:text-4xl">{data?.title}</p>
          <ReactQuill value={data?.content} readOnly={true} theme={'bubble'} />
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
            <button
              onClick={onEditPost}
              className="btn btn-outline px-7 btn-sm"
            >
              수정
            </button>
          ) : null}
          {isLogin && !data?.isMine ? (
            <span className="cursor-pointer" onClick={onToggleLikePost}>
              <Image
                priority
                src={`/images/${data?.isLiked ? 'like-active' : 'like'}.svg`}
                height={32}
                width={32}
                alt="MoreButton"
              />
            </span>
          ) : null}
        </div>
      </div>
      <NewComment onPostComment={onPostComment} />
      <CommentList
        onDeleteComment={onShowDelCommentModal}
        onSuccessUpdateComment={onSuccessUpdateComment}
        comments={data?.comment ?? []}
      />
      <MessageModal />
    </main>
  );
}
