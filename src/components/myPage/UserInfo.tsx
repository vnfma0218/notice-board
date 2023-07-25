'use client';
import { useAppDispatch } from '@/redux/hooks';
import { ChangeEvent, useEffect, useRef, useState } from 'react';
import useSWR from 'swr';
import { showModal } from '@/redux/features/modal/modalSlice';
import { getProfile, updateProfile } from '@/api/user';

const UserInfo = () => {
  const dispatch = useAppDispatch();
  const [imgFile, setImgFile] = useState<File | null>();
  const fileInput = useRef<HTMLInputElement>(null);
  const [previewImage, setPreviewImage] = useState<string | null>('');
  const [nickname, setNickname] = useState<string>('');
  const { data, error } = useSWR('/profile', () => getProfile());

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
    <>
      <div>
        <p className="mt-10 text-2xl font-semibold">회원정보</p>
      </div>
      <div className="md:flex">
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
        </div>
        {/* image */}
        <div className="mt-10 basis-1/2 flex md:justify-end">
          <div className="text-neutral-content w-28 h-28 lg:w-44 lg:h-44">
            <img
              className="cursor-pointer w-full h-full rounded-full"
              onClick={onClickAvatar}
              src={previewImage ? previewImage : data?.avatar}
              alt={data?.nickname}
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
      <div className="md:text-right mt-10 text-center mb-3">
        <button
          onClick={onSubmit}
          className="mt-4 btn btn-info btn-sm text-white px-10"
        >
          저장
        </button>
      </div>
    </>
  );
};
export default UserInfo;
