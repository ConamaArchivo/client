import { createContext, useState, useEffect } from 'react';
import Toast from '../components/Toast';

const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [toast, setToast] = useState({ msg: '', state: '' });

  const displayToast = (msg, state) => {
    setToast({ msg: msg, state: state });
  };

  const removeToast = () => {
    setToast({ msg: '', state: '' });
  };

  useEffect(() => {
    const time = setTimeout(() => {
      removeToast();
    }, 5000);

    return () => {
      clearTimeout(time);
    };
  }, [toast]);

  return (
    <ToastContext.Provider value={{ removeToast, displayToast }}>
      {toast.msg !== '' && toast.state !== '' && (
        <Toast msg={toast.msg} state={toast.state} />
      )}
      {children}
    </ToastContext.Provider>
  );
};

export default ToastContext;
