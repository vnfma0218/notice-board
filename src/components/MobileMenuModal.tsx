'use client';
import useSWR from 'swr';

import Image from 'next/image';
import Link from 'next/link';
import Avatar from './Avatar';
import { getProfile } from '@/api/user';

const MobileMenuModal = () => {
  const { data, error } = useSWR('/profile', () => getProfile());
  console.log('data', data);

  return (
    <dialog id="mobile_modal" className="modal">
      <form
        method="dialog"
        className="modal-box w-screen h-screen min-w-[300px]"
      >
        <div className="flex justify-between items-center">
          <p className="text-xl">Welcome!</p>
          <div className="modal-action mt-0">
            {/* if there is a button, it will close the modal */}
            <button className="btn cursor-pointer">
              <Image
                src="./images/close.svg"
                height={20}
                width={20}
                alt={'closeBtn'}
              />
            </button>
          </div>
        </div>

        <nav className="mt-10">
          <ul className="text-center ">
            <li className="cursor-pointer p-5 hover:text-blue-400 mb-10 hover:bg-slate-300 rounded-md">
              <Link href="/test">테스트페이지</Link>
            </li>
            <li className="cursor-pointer p-5 hover:text-blue-400 mb-10 hover:bg-slate-300 rounded-md">
              <Link href="/board">게시판</Link>
            </li>
          </ul>
        </nav>
        <div className="divider"></div>

        <div className="flex items-center">
          <Avatar pageInfo="modal" />
          <div className="ml-3">
            <p>{data?.nickname}</p>
            <p className="text-gray-500">{data?.email}</p>
          </div>
        </div>
        <div>
          <li className="mt-5 list-none cursor-pointer p-5 hover:text-blue-400 mb-10 hover:bg-slate-300 rounded-md">
            <Link href="/myPage">마이페이지</Link>
          </li>
        </div>
      </form>
    </dialog>
  );
};

export default MobileMenuModal;
