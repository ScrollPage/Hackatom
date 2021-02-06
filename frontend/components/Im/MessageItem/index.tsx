import { renderTimestamp } from "@/utils/renderTimestamp";
import Link from "next/link";
import React, { memo } from "react";
import {
  Wrapper,
  Text,
  Title,
  Header,
  Time,
  Main,
  DocWrapper,
  DocName,
} from "./styles";

interface MessageItemProps {
  content: string;
  timestamp: string;
  company: string;
  isMy: boolean;
  url?: string;
}

const MessageItemComponent: React.FC<MessageItemProps> = ({
  company,
  content,
  timestamp,
  isMy,
  url,
}) => {
  return (
    <Wrapper isMy={isMy}>
      <Main>
        <Header>
          <Title>{company}</Title>
          <Time>{renderTimestamp(timestamp)}</Time>
        </Header>
        <Text>{content}</Text>
      </Main>
      {url && (
        <DocWrapper>
          <Link href={url.substring(0, url.lastIndexOf("/"))}>
            <a download="" title="Скачать документ">
              <img src="/download.svg" alt="Вложенный документ" />
            </a>
          </Link>
          <DocName>
            {url.substring(url.lastIndexOf("/") + 1, url.length)}
          </DocName>
        </DocWrapper>
      )}
    </Wrapper>
  );
};

export const MessageItem = memo(MessageItemComponent);
