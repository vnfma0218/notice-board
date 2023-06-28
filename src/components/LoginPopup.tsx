import { signIn } from 'next-auth/react';
import { ButtonHTMLAttributes, useRef } from 'react';

const LoginPopup = () => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  return (
    <dialog id="my_modal_1" className="modal">
      <form method="dialog" className="modal-box">
        <h3 className="font-bold text-lg text-center mb-5">로그인</h3>
        <div className="flex justify-center">
          <button
            className="btn w-full bg-yellow-300"
            onClick={() => {
              signIn('kakao');
              if (closeBtnRef) {
                closeBtnRef.current?.click();
              }
            }}
          >
            Kakao
          </button>
        </div>

        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn" ref={closeBtnRef}>
            닫기
          </button>
        </div>
      </form>
    </dialog>
  );
};
export default LoginPopup;
