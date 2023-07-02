import { useRef } from 'react';
interface IToastMessage {
  title: string;
  message: string;
}
const MessageModal = ({ message, title }: IToastMessage) => {
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
          <button className="btn">닫기</button>
        </div>
      </form>
    </dialog>
  );
};

export default MessageModal;
