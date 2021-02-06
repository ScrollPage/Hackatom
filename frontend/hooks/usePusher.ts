import { show } from "@/store/actions/alert";
import { IJoinNotify, IMessageNotify, IAccessNotify } from "@/types/notify";
import Pusher from "pusher-js";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useUser } from "./useUser";

export const usePusher = () => {
  const { userId } = useUser();
  const dispatch = useDispatch();

  useEffect(() => {
    const pusher = new Pusher("a3597c743269a2b54c57", {
      cluster: "eu",
      // @ts-ignore: Unreachable code error
      encrypted: true,
    });
    if (userId) {
      const channel = pusher.subscribe(`notifications${userId}`);
      channel.bind("access-request", function (data: IAccessNotify) {
        dispatch(
          show(
            `Вам разрешили доступ к файлам команды ${data.command}!`,
            "success"
          )
        );
      });
      channel.bind("join-request", function (data: IJoinNotify) {
        dispatch(
          show(
            `Вы приняты в команду ${data.command} на должность ${data.role}!`,
            "success"
          )
        );
      });
      channel.bind("new-message", function (data: IMessageNotify) {
        const sender = data.chat.is_chat
          ? data.sender.sender_company
          : data.chat.chat_name;
        const pre = data.chat.is_chat ? "от инициативы" : "в чате команды";
        dispatch(show(`У вас новое сообщение ${pre} ${sender}!`, "success"));
      });
    }
    return () => {
      pusher.disconnect();
    };
  }, [userId]);
};
