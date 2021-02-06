import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import React, { memo, useRef } from "react";
import useSWR from "swr";
import { NotifyItem } from "../NotifyItem";
import { Wrapper } from "./styles";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { RefObject } from "react";

const renderRequestItems = (notifications: any[]) => {
  return notifications.map((notification) => {
    return (
      <NotifyItem
        key={`notifyItem__key__${notification.id}`}
        command={notification.command_name}
        timestamp={notification.timestamp}
        note={notification.note}
        commandId={notification.id}
      />
    );
  });
};

interface NotifyListProps {
  onClose: () => void;
}

const NotifyListComponent: React.FC<NotifyListProps> = ({ onClose }) => {
  const ref = useRef() as RefObject<HTMLDivElement>;

  useOnClickOutside(ref, () => onClose());

  const { data, error } = useSWR(`/api/notification/`);

  return (
    <Wrapper ref={ref}>
      {error ? (
        <ErrorMessage message="Ошибка загрузки уведомлений" />
      ) : !data ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyMessage message="Нет уведомлений" />
      ) : (
        renderRequestItems(data)
      )}
    </Wrapper>
  );
};

export const NotifyList = memo(NotifyListComponent);
