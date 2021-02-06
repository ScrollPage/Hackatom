import { instance } from '@/api';
import { ThunkType } from '@/types/thunk';
import { show } from './alert';
import { trigger } from 'swr';
import Router from 'next/router';
import { getAsString } from '@/utils/getAsString';
import { CreateTaskFormValues } from '@/components/Task/CreateTaskForm';
import { CreateTaskFormValues as CreateUserTaskFormValues } from '@/components/UserTask/CreateTaskForm';
import { EditTaskFormValues } from '@/components/Task/EditTaskForm';

export const addTask = (values: CreateTaskFormValues): ThunkType => async dispatch => {
  const pageCommandId = Number(getAsString(Router.query.ID));
  await instance()
    .post(`/api/task/`, {
      begin_time: values.beginDate,
      end_time: values.endDate,
      name: values.name,
      description: values.description,
      diagram: pageCommandId
    })
    .then((res) => {
      dispatch(show('Вы успешно добавили задачу!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при добавлении задачи!', 'warning'));
    });
  trigger(`/api/command/${pageCommandId}/diagram/`);
};

export const addUserTask = (values: CreateUserTaskFormValues): ThunkType => async dispatch => {
  const pageUserId = Number(getAsString(Router.query.ID));
  await instance()
    .post(`/api/initiativetask/`, {
      begin_time: values.beginDate,
      end_time: values.endDate,
      name: values.name,
      description: values.description,
    })
    .then((res) => {
      dispatch(show('Вы успешно добавили задачу!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при добавлении задачи!', 'warning'));
    });
  trigger(`/api/initiative/${pageUserId}/diagram/`);
};

export const editTask = (values: EditTaskFormValues): ThunkType => async dispatch => {
  const pageCommandId = Number(getAsString(Router.query.ID));
  await instance()
    .patch(`/api/task/${values.name}/`, {
      percentage: Number(values.percentage)
    })
    .then((res) => {
      dispatch(show('Вы успешно изменили задачу!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при изменении задачи!', 'warning'));
    });
  trigger(`/api/command/${pageCommandId}/diagram/`);
};

export const editUserTask = (values: EditTaskFormValues): ThunkType => async dispatch => {
  const pageUserId = Number(getAsString(Router.query.ID));
  await instance()
    .patch(`/api/initiativetask/${values.name}/`, {
      percentage: Number(values.percentage)
    })
    .then((res) => {
      dispatch(show('Вы успешно изменили задачу!', 'success'));
    })
    .catch(() => {
      dispatch(show('Ошибка при изменении задачи!', 'warning'));
    });
  trigger(`/api/initiative/${pageUserId}/diagram/`);
};