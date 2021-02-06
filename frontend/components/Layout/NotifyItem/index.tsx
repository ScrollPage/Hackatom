import { Avatar } from "@/components/UI/Avatar";
import { renderTimestamp } from "@/utils/renderTimestamp";
import Link from "next/link";
import { memo, useMemo } from "react";
import { Wrapper, Name, Hero, Title, Main, Time } from "./styles";

interface NotifyItemProps {
  command: string;
  timestamp: string;
  note: number;
  commandId: number;
}

const NotifyItemComponent: React.FC<NotifyItemProps> = ({
  command,
  timestamp,
  note,
  commandId,
}) => {
  const text = useMemo(() => {
    if (note === 1) {
      return `Вас приняли в команду`;
    } else {
      return `Вам разрешили доступ к документам команды`;
    }
  }, [note]);

  return (
    <Wrapper>
      <Hero>
        <Avatar href={`/command/${commandId}`} />
        <Name>
          <Link href={`/command/${commandId}`}>
            <a>{command}</a>
          </Link>
        </Name>
      </Hero>
      <Main>
        <Title>{text}</Title>
        <Time>{renderTimestamp(timestamp)}</Time>
      </Main>
    </Wrapper>
  );
};

export const NotifyItem = memo(NotifyItemComponent);
