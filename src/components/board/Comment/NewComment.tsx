import { useState } from 'react';
import { useParams } from 'next/navigation';
import { postComment } from '@/api/post';

const NewComment = ({ onPostComment }: { onPostComment: () => void }) => {
  const { id } = useParams();
  const [text, setText] = useState('');

  const submitComment = () => {
    postComment({ text, id }).then((res) => {
      if (res.resultCode === 2000) {
        onPostComment();
      }
    });
  };

  return (
    <>
      <textarea
        className="textarea textarea-bordered w-full"
        placeholder="답변 작성하기"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <div className="text-right mt-1">
        <button
          onClick={submitComment}
          className="btn btn-info text-white px-6"
        >
          답변 쓰기
        </button>
      </div>
    </>
  );
};

export default NewComment;
