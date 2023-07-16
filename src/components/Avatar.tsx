import { logout } from '@/api/login';
import { setLogout } from '@/redux/features/user/userSlice';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
const Avatar = ({ name }: { name: String }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <div className="dropdown dropdown-end cursor-pointer">
      <div tabIndex={0} className="avatar placeholder">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-9">
          <Image
            priority
            src="/images/avatar.svg"
            height={20}
            width={20}
            alt="MoreButton"
          />
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
      >
        <li>
          <a>마이페이지</a>
        </li>
        <li
          onClick={() => {
            logout().then(() => {
              dispatch(setLogout());
              router.push('/signin');
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
