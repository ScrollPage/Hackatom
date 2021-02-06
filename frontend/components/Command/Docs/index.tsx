import { AddDocProps } from "@/components/Modal/AddDoc";
import { EmptyMessage } from "@/components/UI/EmptyMessage";
import { ErrorMessage } from "@/components/UI/ErrorMessage";
import { LoadingSpinner } from "@/components/UI/LoadingSpinner";
import { CommandContext, CommandProps } from "@/pages/command/[ID]";
import { modalShow } from "@/store/actions/modal";
import { IDoc } from "@/types/doc";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo, useContext } from "react";
import { useDispatch } from "react-redux";
import useSWR from "swr";
import { Wrapper, Doc, AddDoc } from "./styles";

const renderDocs = (docs: IDoc[]) => {
  return docs.map((doc) => {
    return (
      <Doc>
        <Link href={doc.doc}>
          <a>{doc.name}</a>
        </Link>
        <img src="/download.svg" alt="Скачать" />
      </Doc>
    );
  });
};

const DocsComponent = () => {
  const dispatch = useDispatch();
  const { docs } = useContext(CommandContext) as CommandProps;
  const { query } = useRouter();

  const { data, error } = useSWR(`/api/command/${query.ID}/doc/`, {
    initialData: docs,
  });

  const handleOpen = () => {
    dispatch(modalShow<AddDocProps>("ADD_DOC", {}));
  };

  return (
    <Wrapper>
      {error ? (
        <ErrorMessage message="Ошибка загрузки документов" />
      ) : !data ? (
        <LoadingSpinner />
      ) : data.length === 0 ? (
        <EmptyMessage message="Список документов пуст" />
      ) : (
        renderDocs(data)
      )}
      <AddDoc onClick={handleOpen}>+</AddDoc>
    </Wrapper>
  );
};

export const Docs = memo(DocsComponent);
