import { IPost } from '@/lib/types/post';
import { elapsedTime } from '@/lib/utils/common';
import Link from 'next/link';

const PostItem = ({ post }: { post: IPost }) => {
  return (
    <>
      <li className="flex border-gray-950 p-2">
        <div className="border border-black py-3 px-5 mr-5 text-center rounded-md">
          <p>답변</p>
          <p>{post.commentCount}</p>
        </div>
        <div className="flex flex-col justify-between pt-1 mb-2">
          <div className="flex items-center">
            <p className="mr-3">{post.user.nickname}</p>

            <p className="text-sm">{elapsedTime(post.createdAt)}</p>
          </div>

          <Link href={`/board/${post.id}`}>
            <p className="text-xl font-bold cursor-pointer hover:text-blue-400 mb-3">
              {post?.title}
            </p>
          </Link>
        </div>
      </li>
      <div className="divider m-0"></div>
    </>
  );
};

export default PostItem;
