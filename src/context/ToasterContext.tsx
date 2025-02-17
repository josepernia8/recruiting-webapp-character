import { createContext, useContext, useState } from 'react';
import { Message } from '../types';
import { Toaster } from '../components/Toaster';


interface ToasterContextType {
  message: Message | null;
  showMessage: (message: Message) => void;
  closeMessage: () => void;
}

const ToasterContext = createContext<ToasterContextType | null>(null);

export const ToasterProvider = ({ children }: { children: React.ReactNode }) => {
  const [message, setMessage] = useState<Message | null>(null);

  const closeMessage = () => {
    setMessage(null);
  };

  const showMessage = (message: Message) => {
    setMessage(message);
    setTimeout(() => closeMessage(), 3000);
  };

  return (
    <ToasterContext.Provider value={{ message, showMessage, closeMessage }}>
      {children}
      {message && <Toaster message={message} onClose={closeMessage} />}
    </ToasterContext.Provider>
  );
};

export const useToaster = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    throw new Error('useToaster must be used within a ToasterProvider');
  }
  return context;
};
