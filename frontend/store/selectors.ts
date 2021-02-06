import { AppStateType } from './reducers/rootReducer';

export const getAlertInfo = (state: AppStateType) => {
  const { text, typeOf, IsNotClose } = state.alert;
  return {
    text,
    type: typeOf,
    isNotClose: IsNotClose
  }
}

export const getModalInfo = (state: AppStateType) => {
  const { modalName, modalProps } = state.modal;
  return {
    name: modalName,
    props: modalProps
  }
}

export const getMessageInfo = (state: AppStateType) => {
  const { messages, loading } = state.message;
  return {
    messages, loading
  }
}


