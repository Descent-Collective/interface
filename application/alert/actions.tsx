'use client';

import useSystemFunctions from '@/hooks/useSystemFunctions';
import { setAlert } from '.';
import { CallbackProps } from '../store';
import { Alert } from './types';

const useAlertActions = () => {
  const { dispatch } = useSystemFunctions();

  const alertUser = async (values: Alert, callback?: CallbackProps) => {
    try {
      dispatch(setAlert(values));

      setTimeout(() => {
        dispatch(setAlert(undefined));
      }, 5000);
    } catch (error: any) {
      callback?.onError?.(error);
    }
  };

  return {
    alertUser,
  };
};

export default useAlertActions;
