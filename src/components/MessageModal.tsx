import { useAppSelector } from '@/redux/hooks';

const MessageModal = () => {
  const modalState = useAppSelector((state) => state.modalReducer);

  return (
    <dialog id="message_modal" className="modal">
      <form method="dialog" className="modal-box">
        <div className="text-2xl font-bold">
          <span>{modalState.title}</span>
        </div>
        <p className="py-4">{modalState.message}</p>
        <div className="modal-action">
          {/* if there is a button in form, it will close the modal */}
          {modalState.hasConfirm ? (
            <button onClick={modalState.confirmCallback} className="btn">
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
