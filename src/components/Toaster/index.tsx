import { Message, MessageType } from "../../types";

interface ToasterProps {
  message: Message;
  onClose: () => void;
}

export const Toaster = ({ message, onClose }: ToasterProps) => {
  const classType = {
    [MessageType.SUCCESS]: 'success',
    [MessageType.ERROR]: 'error',
  };

  return (
    <div className={`toaster ${classType[message.type] || ''}`} role="alert">
      <span>{message.content}</span>
      <button
        onClick={onClose}
        aria-label="Close toaster message"
        type="button"
      >
        ×
      </button>
    </div>
  );
};
