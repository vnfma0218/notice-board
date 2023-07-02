import { AlertTypes } from '@/lib/types';

interface IToastMessage {
  message: string;
  alertType: AlertTypes;
}
const ToastMessage = ({ message, alertType }: IToastMessage) => {
  return (
    <div className="toast toast-top toast-end">
      <div className={`alert ${alertType && `alert-${alertType}`}`}>
        <span>message</span>
      </div>
      {/* <div className="alert alert-success">
        <span>Message sent successfully.</span>
      </div> */}
    </div>
  );
};

export default ToastMessage;
