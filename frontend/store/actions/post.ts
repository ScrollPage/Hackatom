import { instance } from '@/api';
import { ThunkType } from '@/types/thunk';
import { trigger } from 'swr';
import { show } from './alert';
import Router from 'next/router';
import { getAsString } from '@/utils/getAsString';

export const addPost = (triggerUrl: string, where: 'profile' | 'command', title?: string, image?: any): ThunkType => async dispatch => {
  let form_data = new FormData();
  if (title) {
    form_data.append('title', title);
  }
  if (image) {
    form_data.append('picture', image, image.name);
  }
  if (where === 'command') {
    const commandId = getAsString(Router.query.ID);
    if (commandId) {
      form_data.append('command', commandId);
    }
  } else {
    form_data.append('command', "");
  }
  await instance()
    .post(`/api/post/`, form_data)
    .then(async (res) => {
      dispatch(show('Вы успешно добавили пост!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при добавлении поста!', 'warning'));
    });
  trigger(triggerUrl);
};

export const deletePost = (triggerUrl: string, id: number): ThunkType => async dispatch => {
  await instance()
    .delete(`/api/post/${id}`)
    .then(async (res) => {
      dispatch(show('Вы успешно удалили пост!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при удалении поста!', 'warning'));
    });
  trigger(triggerUrl);
};

export const likePost = (triggerUrl: string, id: number): ThunkType => async dispatch => {
  await instance()
    .post(`/api/post/${id}/like/`, {})
    .then(async (res) => {
      // dispatch(show('Вы успешно добавили лайк!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при добавлении лайка!', 'warning'));
    });
  trigger(triggerUrl);
};

