import useSWR from 'swr';
import RandomAvatar from 'boring-avatars';

import { logout } from '@/api/login';
import { setLogout } from '@/redux/features/user/userSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getProfile } from '@/api/user';

const Avatar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { data, mutate } = useSWR('/profile', () => getProfile());
  const env = process.env.NODE_ENV;

  return (
    <div className="dropdown dropdown-end cursor-pointer">
      <div tabIndex={0} className="avatar placeholder">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-9">
          {env === 'development' ? (
            <Image
              priority
              src={data?.avatar ? data?.avatar : '/images/profile_default.svg'}
              height={20}
              width={20}
              alt="MoreButton"
            />
          ) : (
            <RandomAvatar
              size={40}
              name="Mahalia Jackson"
              variant="marble"
              colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
            />
          )}
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
      >
        <li
          onClick={() => {
            router.push('/myPage');
          }}
        >
          <a>마이페이지</a>
        </li>
        <li
          onClick={() => {
            dispatch(setLogout());
            logout().then(() => {
              mutate();
              router.push('/login');
            });
          }}
        >
          <a>로그아웃</a>
        </li>
      </ul>
    </div>
    // <div className="avatar placeholder">
    //   <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
    //     <span>PR</span>
    //   </div>
    // </div>
  );
};

export default Avatar;
