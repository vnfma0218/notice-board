import { signOut } from 'next-auth/react';
const Avatar = ({ name }: { name: String }) => {
  return (
    <div className="dropdown dropdown-end cursor-pointer">
      <div tabIndex={0} className="avatar placeholder">
        <div className="bg-neutral-focus text-neutral-content rounded-full w-10">
          <span className="text-sm">{name}</span>
        </div>
      </div>
      <ul
        tabIndex={0}
        className="menu dropdown-content z-[1] p-2 shadow bg-base-100 rounded-box w-52 mt-4"
      >
        <li>
          <a>마이페이지</a>
        </li>
        <li onClick={() => signOut()}>
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
