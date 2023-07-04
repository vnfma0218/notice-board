import { IPost } from '@/lib/types/post';
import Link from 'next/link';

const PostItem = ({ post }: { post: IPost }) => {
  return (
    <>
      <li className="flex border-gray-950 p-2">
        <div className="border border-black py-3 px-5 mr-5 text-center rounded-md">
          <p>답변</p>
          <p>{post.commentCount}</p>
        </div>
        <div className="pt-1">
          <Link href={`/board/${post.id}`}>
            <p className="text-xl font-bold cursor-pointer hover:text-blue-400 mb-3">
              {post?.title}
            </p>
          </Link>
          <p className="text-gray-400 cursor-pointer hover:text-blue-400">
            {post.content}
          </p>
        </div>
      </li>
      <div className="divider m-0"></div>
    </>
  );
};

export default PostItem;
