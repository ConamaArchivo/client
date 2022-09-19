import { createPortal } from 'react-dom';
import React from 'react';
import { ToggleButton } from '@mui/material';
import TaskAlt from '@mui/icons-material/TaskAlt';
import ErrorOutline from '@mui/icons-material/ErrorOutline';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import useToast from '../hooks/useToast';

const Toast = ({ msg, state }) => {
  const { removeToast } = useToast();

  return createPortal(
    <div className={`toast-msg ${state}`}>
      {state === 'success' && <TaskAlt />}
      {state === 'error' && <ErrorOutline />}
      {state === 'information' && <InfoOutlined />}
      <div className="text">{msg}</div>
      <ToggleButton value="" onClick={removeToast}>
        <CloseIcon />
      </ToggleButton>
    </div>,
    document.body
  );
};

export default Toast;
