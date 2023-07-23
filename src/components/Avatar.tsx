import { logout } from '@/api/login';
import { setLogout } from '@/redux/features/user/userSlice';
// import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { getProfile } from '@/api/user';
import { useEffect, useState } from 'react';
interface IUserProfile {
  avatar: string;
  email: string;
  nickname: string;
}
const Avatar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [profile, setProfile] = useState<IUserProfile>();
  // const { data, mutate } = useSWR('/profile', () => getProfile());

  useEffect(() => {
    getProfile().then((res) => {
      setProfile(res);
    });
  }, []);

  return (
    <div className="dropdown dropdown-end cursor-pointer">
      <div tabIndex={0} className="avatar placeholder">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-9">
          <img src={profile?.avatar} alt={profile?.nickname} />
          {/* <Image
            priority
            src={'https://source.boringavatars.com/'}
            height={20}
            width={20}
            alt="MoreButton"
          /> */}
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
              // mutate();
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
