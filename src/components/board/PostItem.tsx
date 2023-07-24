import RandomAvatar from 'boring-avatars';

import { IPost } from '@/lib/types/post';
import { elapsedTime } from '@/lib/utils/common';
import Link from 'next/link';
import UserAvatar from '../UserAvatar';

const PostItem = ({ post }: { post: IPost }) => {
  return (
    <>
      <li className="flex justify-between items-center border-gray-950 p-2">
        <div className="flex flex-col justify-between pt-1 mb-2">
          <div className="flex items-center mt-2">
            <div className="mr-2">
              <div className="w-10 h-10">
                <UserAvatar url={post.user?.avatar} alt={post.user?.nickname} />
              </div>
            </div>

            <p className="mr-3">{post.user.nickname}</p>
            <p className="text-sm">{elapsedTime(post.createdAt)}</p>
          </div>

          <Link href={`/board/${post._id}`} prefetch={false}>
            <p className="mt-2 text-xl font-bold cursor-pointer hover:text-blue-400 mb-3">
              {post?.title}
            </p>
          </Link>
        </div>
        <div className="border border-black py-3 px-5 mr-5 text-center rounded-md h-10 flex justify-center items-center">
          <p>답변</p>
          <p>{post.commentCount}</p>
        </div>
      </li>
      <div className="divider m-0"></div>
    </>
  );
};

export default PostItem;
