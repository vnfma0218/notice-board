import { updateComment } from '@/api/post';
import { CommentType } from '@/lib/types/post';
import { elapsedTime, getAvatarUrl } from '@/lib/utils/common';
import { useMemo, useState } from 'react';
import TextEditor from '@/components/TextEditor';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import RandomAvatar from 'boring-avatars';

const CommentItem = ({
  comment,
  onDeleteComment,
  onSuccessUpdateComment,
}: {
  comment: CommentType;
  onDeleteComment: (commentId: string) => void;
  onSuccessUpdateComment: () => void;
}) => {
  const ReactQuill = useMemo(
    () => dynamic(() => import('react-quill'), { ssr: false }),
    []
  );
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
  const avatarUrl = getAvatarUrl(comment.user.avatar?.filename ?? '');

  const env = process.env.NODE_ENV;

  return (
    <div>
      <li className="border-b p-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div>
              {env === 'development' ? (
                <Image
                  priority
                  src={avatarUrl ? avatarUrl : '/images/profile_default.svg'}
                  height={50}
                  width={50}
                  alt="MoreButton"
                  className="rounded-full mr-3"
                />
              ) : (
                <RandomAvatar
                  size={40}
                  name="Mahalia Jackson"
                  variant="marble"
                  colors={[
                    '#92A1C6',
                    '#146A7C',
                    '#F0AB3D',
                    '#C271B4',
                    '#C20D90',
                  ]}
                />
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold">
                {comment.user.nickname}
              </span>
              <span className="text-xs mr-2">
                {elapsedTime(comment.createdAt)}
              </span>
            </div>
          </div>
          <div className="flex items-center">
            <div className="border rounded-md flex">
              <button className="border-r px-2 py-1">
                <Image
                  priority
                  src="/images/arrow-down.svg"
                  height={20}
                  width={20}
                  alt="MoreButton"
                />
              </button>
              <button className="py-1 px-4">0</button>
              <button className="border-l px-2 py-1">
                <Image
                  priority
                  src="/images/arrow-up.svg"
                  height={20}
                  width={20}
                  alt="MoreButton"
                />
              </button>
            </div>

            {comment.isMine ? (
              <div className="ml-2 dropdown dropdown-bottom dropdown-end">
                <label tabIndex={0} className="m-1 cursor-pointer">
                  <Image
                    priority
                    src="/images/more_btn.svg"
                    height={20}
                    width={20}
                    alt="MoreButton"
                  />
                </label>
                <ul
                  tabIndex={0}
                  className="dropdown-content z-[1] menu p-2 shadow bg-base-100 text-center rounded-sm"
                >
                  <li
                    onClick={onChangeUpdateMode}
                    className="w-20 mb-3 cursor-pointer"
                  >
                    <div className="hover:text-blue-400">
                      <Image
                        priority
                        src="/images/update.svg"
                        height={13}
                        width={13}
                        alt="updateBtn"
                      />
                      수정
                    </div>
                  </li>
                  <li
                    onClick={showDeletePopup}
                    className="w-20 cursor-pointer hover:text-blue-400"
                  >
                    <div className="hover:text-blue-400">
                      <Image
                        priority
                        src="/images/delete.svg"
                        height={13}
                        width={13}
                        alt="updateBtn"
                      />
                      삭제
                    </div>
                  </li>
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="mt-5">
          {updateMode ? (
            <div>
              <TextEditor value={updateText} setContents={setUpdateText} />
              <div className="mt-3 flex justify-end">
                <button
                  className="btn btn-sm mr-2"
                  onClick={() => {
                    setUpdateMode(false);
                  }}
                >
                  취소
                </button>
                <button
                  onClick={onSubmit}
                  className="btn btn-sm btn-info text-white"
                >
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
