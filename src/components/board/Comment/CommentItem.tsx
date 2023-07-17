'use client';
import MessageModal from '@/components/MessageModal';
import { CommentType } from '@/lib/types/post';
import { elapsedTime } from '@/lib/utils/common';

const CommentItem = ({
  comment,
  onDeleteComment,
}: {
  comment: CommentType;
  onDeleteComment: (commentId: string) => void;
}) => {
  const onDelete = () => {
    console.log('delete');
  };
  const showDeletePopup = () => {
    onDeleteComment(comment._id);
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
          </div>
        </div>

        <div className="mt-5">
          <span>{comment.text}</span>
        </div>
      </li>
    </div>
  );
};
export default CommentItem;
