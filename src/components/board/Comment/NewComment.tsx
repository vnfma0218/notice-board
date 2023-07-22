import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { postComment } from '@/api/post';
import TextEditor from '@/components/TextEditor';
import { useAppDispatch, useAppSelector } from '@/redux/hooks';
import { showModal } from '@/redux/features/modal/modalSlice';

const NewComment = ({ onPostComment }: { onPostComment: () => void }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const isLogin = useAppSelector((state) => state.userReducer.isLoggedIn);
  const { id } = useParams();
  const [contents, setContents] = useState('');

  const submitComment = () => {
    if (!isLogin) {
      dispatch(
        showModal({
          title: '안내',
          message: '로그인이 필요합니다. 로그인하시겠습니까?',
          hasConfirm: true,
          confirmCallback: () => {
            router.push('/login');
          },
        })
      );
      return;
    }
    postComment({ text: contents, id }).then((res) => {
      if (res.resultCode === 2000) {
        onPostComment();
        setContents('');
      }
    });
  };

  return (
    <>
      <TextEditor
        value={contents}
        setContents={setContents}
        placeholder={
          !isLogin ? '로그인이 필요합니다' : '좋은 의견을 나눠주세요'
        }
      />
      <div className="text-right mt-2">
        <button
          onClick={submitComment}
          className="btn btn-sm btn-info text-white px-6"
        >
          답변 쓰기
        </button>
      </div>
    </>
  );
};

export default NewComment;
