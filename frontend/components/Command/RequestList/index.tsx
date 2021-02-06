import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { useOnClickOutside } from "@/hooks/useOnClickOutside";
import { IJoinRequest, IAccessRequest } from "@/types/request";
import { useRouter } from "next/router";
import React, { memo, useRef } from "react";
import { RefObject } from "react";
import useSWR from "swr";
import { AccessItem } from "../AccessItem";
import { RequestItem } from "../RequestItem";
import { Wrapper } from "./styles";

const renderRequestItems = (requests: IJoinRequest[]) => {
  return requests.map((request) => {
    return (
      <RequestItem
        key={`requestItem__key__${request.id}`}
        role={request.role}
        initiative={request.initiative}
        id={request.id}
      />
    );
  });
};

const renderAccessItems = (requests: IAccessRequest[]) => {
  return requests.map((request) => {
    return (
      <AccessItem
        key={`accessItem__key__${request.id}`}
        initiative={request.initiative}
        id={request.id}
      />
    );
  });
};

interface RequestListProps {
  onClose: () => void;
}

const RequestListComponent: React.FC<RequestListProps> = ({ onClose }) => {
  const { query } = useRouter();
  const ref = useRef() as RefObject<HTMLDivElement>;

  useOnClickOutside(ref, () => onClose());

  const { data: joinData, error: joinError } = useSWR(
    `/api/command/${query.ID}/join/`
  );
  const { data: accessData, error: accessError } = useSWR(
    `/api/command/${query.ID}/access/`
  );

  return (
    <Wrapper ref={ref}>
      {joinError || accessError ? (
        <ErrorMessage message="Ошибка загрузки запросов" />
      ) : !joinData || !accessData ? (
        <LoadingSpinner />
      ) : joinData.length === 0 && accessData.length === 0 ? (
        <EmptyMessage message="Нет запросов" />
      ) : (
        <>
          {renderRequestItems(joinData)} {renderAccessItems(accessData)}
        </>
      )}
    </Wrapper>
  );
};

export const RequestList = memo(RequestListComponent);
