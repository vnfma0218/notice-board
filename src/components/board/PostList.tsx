import { IPost } from '@/lib/types/post';
import PostItem from './PostItem';

const BoardList = ({ posts }: { posts: IPost[] }) => {
  return (
    <ul className="min-h-[500px]">
      {posts.map((post) => {
        return <PostItem post={post} key={post._id} />;
      })}
    </ul>
  );
};

export default BoardList;
