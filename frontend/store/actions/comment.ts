import { instance } from '@/api';
import { ThunkType } from '@/types/thunk';
import { show } from './alert';
import { trigger } from 'swr';

export const addComment = (text: string, postId: number): ThunkType => async dispatch => {
  await instance()
    .post(`/api/comment/`, {
      content: text,
      post: postId
    })
    .then((res) => {
      dispatch(show('Вы успешно добавили комментарий!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при добавлении комментария!', 'warning'));
    });
  trigger(`/api/post/${postId}/comment/`)
};

export const deleteComment = (commentId: number, postId: number): ThunkType => async dispatch => {
  await instance()
    .delete(`/api/comment/${commentId}/`)
    .then((res) => {
      dispatch(show('Вы успешно удалили комментарий!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при удалении комментария!', 'warning'));
    });
  trigger(`/api/post/${postId}/comment/`)
};