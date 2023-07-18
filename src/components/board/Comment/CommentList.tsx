import { CommentType } from '@/lib/types/post';
import CommentItem from './CommentItem';

const CommentList = ({
  comments,
  onDeleteComment,
  onSuccessUpdateComment,
}: {
  comments: CommentType[];
  onDeleteComment: (commentId: string) => void;
  onSuccessUpdateComment: () => void;
}) => {
  return (
    <ul>
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          onDeleteComment={onDeleteComment}
          onSuccessUpdateComment={onSuccessUpdateComment}
        />
      ))}
    </ul>
  );
};
export default CommentList;
