type ModalShowType<T> = {
  type: 'MODAL_SHOW',
  modalName: ModalNameType,
  modalProps: T
}

export type ModalNameType =
  'CHANGE_PROFILE' |
  'CHANGE_COMMAND' |
  'DELETE_POST' |
  'DELETE_COMMAND' |
  'ADD_COMMAND' |
  'JOIN_COMMAND' |
  'ADD_DOC' |
  'DELETE_CHAT' |
  'EXIT_COMMAND' |
  'DELETE_COMMENT' |
  'DELETE_REVIEW' |
  null;

export function modalShow<T>(modalName: ModalNameType, modalProps: T): ModalShowType<T> {
  return { type: 'MODAL_SHOW', modalName, modalProps } as const
}

export const modalHide = () => ({ type: 'MODAL_HIDE' } as const);

export type ModalActionTypes = ModalShowType<any> | ReturnType<typeof modalHide>; 
