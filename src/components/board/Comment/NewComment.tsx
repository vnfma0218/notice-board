import { useMemo, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { postComment } from '@/api/post';
import TextEditor from '@/components/TextEditor';

const NewComment = ({ onPostComment }: { onPostComment: () => void }) => {
  const { id } = useParams();
  const [contents, setContents] = useState('');

  const submitComment = () => {
    postComment({ text: contents, id }).then((res) => {
      if (res.resultCode === 2000) {
        onPostComment();
        setContents('');
      }
    });
  };

  return (
    <>
      <TextEditor value={contents} setContents={setContents} />
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
