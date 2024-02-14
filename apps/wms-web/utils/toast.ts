import { toast, TypeOptions, Theme, ToastPosition } from 'react-toastify';

interface ToastConfig {
  position?: ToastPosition;
  autoClose?: number;
  hideProgressBar?: boolean;
  closeOnClick?: boolean;
  pauseOnHover?: boolean;
  draggable?: boolean;
  theme?: Theme;
  progress?: any;
  type?: TypeOptions;
}

const DEFAULT_CONFIG: ToastConfig = {
  position: 'top-right',
  autoClose: 2000,
  hideProgressBar: true,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: 'light',
  type: 'success',
};

export const pushNotify = (message: string, config: ToastConfig = {}) => {
  toast(message, {
    ...DEFAULT_CONFIG,
    ...config,
  });
};
