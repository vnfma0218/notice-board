import { useRef } from 'react';
interface IToastMessage {
  title: string;
  message: string;
  hasConfirm?: boolean;
  confirmBtnClickCb?: () => void;
}
const MessageModal = ({
  message,
  title,
  hasConfirm,
  confirmBtnClickCb,
}: IToastMessage) => {
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  return (
    <dialog id="message_modal" className="modal">
      <form method="dialog" className="modal-box">
        <div className="text-2xl font-bold">
          <span>{title}</span>
        </div>
        <p className="py-4">{message}</p>
        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          {hasConfirm ? (
            <button onClick={confirmBtnClickCb} className="btn">
              확인
            </button>
          ) : null}
          <button className="btn">닫기</button>
        </div>
      </form>
    </dialog>
  );
};

export default MessageModal;
