import { instance } from '@/api';
import { ThunkType } from '@/types/thunk';
import { show } from './alert';
import { trigger } from 'swr';
import Router from 'next/router';
import { getAsString } from '@/utils/getAsString';

export const addReview = (text: string): ThunkType => async dispatch => {
  const pageUserId = getAsString(Router.query.ID);
  await instance()
    .post(`/api/review/`, {
      content: text,
      estimated: pageUserId
    })
    .then((res) => {
      dispatch(show('Вы успешно добавили отзыв!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при добавлении отзыва!', 'warning'));
    });
  trigger(`/api/initiative/${pageUserId}/review/`);
  trigger(`/api/initiative/${pageUserId}/`);
};

export const deleteReview = (reviewId: number): ThunkType => async dispatch => {
  const pageUserId = getAsString(Router.query.ID);
  await instance()
    .delete(`/api/review/${reviewId}/`)
    .then((res) => {
      dispatch(show('Вы успешно удалили отзыв!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при удалении отзыва!', 'warning'));
    });
  trigger(`/api/initiative/${pageUserId}/review/`);
  trigger(`/api/initiative/${pageUserId}/`);
};