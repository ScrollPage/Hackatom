import Cookie from 'js-cookie';
import { instance } from '@/api';
import { ThunkType } from '@/types/thunk';
import { show } from './alert';
import Router from 'next/router';
import { getAsString } from '@/utils/getAsString';
import { trigger } from 'swr';

export const createChat = (): ThunkType => async dispatch => {
  const userId = Number(Cookie.get('userId'));
  const anotherUserId = Number(getAsString(Router.query.ID));
  await instance()
    .post(`/api/chat/`, {
      members: [userId, anotherUserId]
    })
    .then((res) => {
      const chatId = res.data.id;
      Router.push({ pathname: '/im', query: { id: chatId } }, undefined, { shallow: true });
      dispatch(show('Вы успешно создали чат!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при создании чата!', 'warning'));
    });
};

export const addDocChat = (file: any, callback: (doc: string) => void): ThunkType => async dispatch => {
  const currentChatId = getAsString(Router.query.id);
  if (currentChatId) {
    let form_data = new FormData();
    form_data.append('doc', file, file.name);
    form_data.append('chat', currentChatId);
    await instance()
      .post(`/api/chatdoc/`, form_data)
      .then((res) => {
        callback(res.data.doc);
      })
      .catch(() => {
        dispatch(show('Ошибка при заливки документа 2!', 'warning'));
      });
  } else {
    dispatch(show('Ошибка при заливки документа 1!', 'warning'));
  }
};

export const deleteChat = (id: number): ThunkType => async dispatch => {
  await instance()
    .delete(`/api/chat/${id}/`)
    .then((res) => {
      Router.push({ pathname: '/im' }, undefined, { shallow: true });
      dispatch(show('Вы успешно удалили чат!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при удалении чата!', 'warning'));
    });
  trigger('/api/chat/');
};

