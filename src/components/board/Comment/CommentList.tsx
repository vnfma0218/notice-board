import { CommentType } from '@/lib/types/post';
import CommentItem from './CommentItem';

const CommentList = ({
  comments,
  onDeleteComment,
}: {
  comments: CommentType[];
  onDeleteComment: (commentId: string) => void;
}) => {
  return (
    <ul>
      {comments.map((comment) => (
        <CommentItem
          key={comment._id}
          comment={comment}
          onDeleteComment={onDeleteComment}
        />
      ))}
    </ul>
  );
};
export default CommentList;
