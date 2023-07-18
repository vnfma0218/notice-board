import ReactQuill from 'react-quill';

import { updateComment } from '@/api/post';
import { CommentType } from '@/lib/types/post';
import { elapsedTime } from '@/lib/utils/common';
import { useState } from 'react';
import TextEditor from '@/components/TextEditor';

const CommentItem = ({
  comment,
  onDeleteComment,
  onSuccessUpdateComment,
}: {
  comment: CommentType;
  onDeleteComment: (commentId: string) => void;
  onSuccessUpdateComment: () => void;
}) => {
  const [updateMode, setUpdateMode] = useState(false);
  const [updateText, setUpdateText] = useState('');

  const showDeletePopup = () => {
    onDeleteComment(comment._id);
  };
  const onChangeUpdateMode = () => {
    setUpdateText(comment.text);
    setUpdateMode(true);
  };
  const onSubmit = () => {
    updateComment(comment._id, updateText).then((res) => {
      console.log(res);
      if (res.resultCode === 2000) {
        setUpdateMode(false);
        onSuccessUpdateComment();
      }
    });
    console.log('onsubmit');
  };
  return (
    <div>
      <li className="border-b p-3">
        <div className="flex justify-between">
          <span>작성자: {comment.user.nickname}</span>
          <div>
            <span className="text-sm">{elapsedTime(comment.createdAt)}</span>
            {comment.isMine ? (
              <button
                onClick={showDeletePopup}
                className="btn btn-sm btn-warning"
              >
                삭제
              </button>
            ) : null}
            {comment.isMine && !updateMode ? (
              <button
                onClick={onChangeUpdateMode}
                className="btn btn-sm btn-accent"
              >
                수정
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-5">
          {updateMode ? (
            <div>
              <TextEditor value={updateText} setContents={setUpdateText} />
              <div className="flex justify-end">
                <button
                  className="btn mr-2"
                  onClick={() => {
                    setUpdateMode(false);
                  }}
                >
                  취소
                </button>
                <button onClick={onSubmit} className="btn btn-info text-white">
                  답변 쓰기
                </button>
              </div>
            </div>
          ) : (
            <ReactQuill value={comment.text} readOnly={true} theme={'bubble'} />
          )}
        </div>
      </li>
    </div>
  );
};
export default CommentItem;
