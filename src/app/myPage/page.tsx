'use client';
import Avatar from '@/components/Avatar';
import Image from 'next/image';
import { ChangeEvent, useEffect, useRef, useState } from 'react';

export default function MyPage() {
  const [imgFile, setImgFile] = useState<File | null>();
  const fileInput = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>('');
  useEffect(() => {
    if (imgFile) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(imgFile);
    } else {
      setPreviewImage(null);
    }
  }, [imgFile]);

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
                placeholder="lpr0218@naver.com"
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
                placeholder="Type here"
                className="input input-bordered w-full max-w-sm"
              />
            </div>
          </div>
          {/* image */}
          <div className="mt-10 basis-1/2 flex justify-end">
            <div className="text-neutral-content">
              <Image
                className="cursor-pointer rounded-full"
                priority
                src={previewImage ? previewImage : '/images/avatar.svg'}
                height={120}
                width={120}
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
        <div className="text-right mt-10">
          <button className="mt-4 btn btn-info btn-sm text-white px-10">
            저장
          </button>
        </div>
      </section>
    </main>
  );
}
