'use client';
import useSWR from 'swr';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { getProfile, updateProfile } from '@/api/user';
import { useAppDispatch } from '@/redux/hooks';
import { showModal } from '@/redux/features/modal/modalSlice';
import MessageModal from '@/components/MessageModal';

export default function MyPage() {
  const dispatch = useAppDispatch();
  const [imgFile, setImgFile] = useState<File | null>();
  const fileInput = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>('');
  const [nickname, setNickname] = useState<string>('');

  const { data } = useSWR('/profile', () => getProfile());

  useEffect(() => {
    if (data?.nickname) {
      setNickname(data.nickname);
    }

    if (imgFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(imgFile);
    } else {
      setPreviewImage(null);
    }
  }, [imgFile, data]);

  const onClickAvatar = () => {
    fileInput.current?.click();
  };
  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files !== null) {
      const file = e.target.files[0];
      if (file && file.type.substring(0, 5) === 'image') {
        setImgFile(file);
      } else {
        setImgFile(null);
      }
    }
  };
  const onSubmit = () => {
    const frm = new FormData();

    const name = nickname ? nickname : data.nickname;
    frm.append('nickname', name);
    if (imgFile) {
      frm.append('file', imgFile);
    }
    updateProfile(frm).then((res) => {
      if (res.resultCode === 2000) {
        dispatch(showModal({ message: '변경하였습니다', title: '완료' }));
      }
    });
  };

  return (
    <main className="flex m-auto px-20 mt-10">
      <section className="side-menu basis-1/3 h-screen min-w-[250px] pr-10">
        <div>
          <p className="text-2xl font-semibold">내 계정</p>
        </div>
        <ul className="mt-10">
          <li className="flex items-center bg-slate-300 rounded-md p-3 hover:bg-slate-300 cursor-pointer">
            <span>
              <Image
                priority
                src="/images/user-circle.svg"
                height={25}
                width={25}
                alt="MoreButton"
              />
            </span>
            <span className="text-lg ml-3">회원정보</span>
          </li>
          <li className="mt-3 flex items-center rounded-md p-3 hover:bg-slate-300 cursor-pointer">
            <span>
              <Image
                priority
                src="/images/user-circle.svg"
                height={25}
                width={25}
                alt="MoreButton"
              />
            </span>
            <span className="text-lg ml-3">회원정보</span>
          </li>
        </ul>
      </section>
      <div className="border"></div>

      <section className="pl-20 basis-2/3">
        <div>
          <p className="text-2xl font-semibold">회원정보</p>
        </div>

        <div className="flex">
          {/* detail info */}
          <div className="mt-10 basis-1/2">
            <div>
              <label className="label">
                <span className="label-text">이메일</span>
              </label>
              <input
                type="text"
                placeholder={data?.email}
                className="input input-bordered w-full max-w-sm font-bold"
                disabled
              />
            </div>
            <div className="mt-4">
              <label className="label">
                <span className="label-text">닉네임</span>
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => {
                  setNickname(e.target.value);
                }}
                placeholder="Type here"
                className="input input-bordered w-full max-w-sm"
              />
            </div>
            <div className="text-right mt-10">
              <button
                onClick={onSubmit}
                className="mt-4 btn btn-info btn-sm text-white px-10"
              >
                저장
              </button>
            </div>
          </div>
          {/* image */}
          <div className="mt-10 basis-1/2 flex justify-end">
            <div className="text-neutral-content">
              <Image
                className="cursor-pointer rounded-full"
                priority
                src={
                  previewImage
                    ? previewImage
                    : data?.avatar
                    ? data?.avatar
                    : '/images/profile_default.svg'
                }
                height={170}
                width={170}
                alt="MoreButton"
                onClick={onClickAvatar}
              />
            </div>
            <input
              name="img"
              type="file"
              accept="image/*"
              className="hidden"
              ref={fileInput}
              onChange={fileChange}
            />
          </div>
        </div>
      </section>
      <MessageModal />
    </main>
  );
}
