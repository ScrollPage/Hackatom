import { CommentItem } from "@/components/Comment/CommentItem";
import { Comments } from "@/components/Comment/Comments";
import { DeletePostProps } from "@/components/Modal/DeletePost";
import { Avatar } from "@/components/UI/Avatar";
import { useUser } from "@/hooks/useUser";
import { modalShow } from "@/store/actions/modal";
import { IPost } from "@/types/post";
import { renderTimestamp } from "@/utils/renderTimestamp";
import Link from "next/link";
import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { CommentIcon } from "../CommentIcon";
import { Like } from "../Like";
import { PostsContext, PostsContextProps } from "../Posts";
import {
  Wrapper,
  Inner,
  Hero,
  Name,
  Text,
  Close,
  Title,
  Time,
  Bottom,
  LastComment,
} from "./styles";

interface PostItemProps extends IPost {}

const PostItemComponent: React.FC<PostItemProps> = ({
  id,
  title,
  initiative,
  picture,
  num_likes,
  is_liked,
  post_time,
  last_comment,
  num_comments,
}) => {
  const dispatch = useDispatch();
  const { userId } = useUser();
  const { triggerUrl } = useContext(PostsContext) as PostsContextProps;
  const [isShowText, setIsShowText] = useState(!((title?.length ?? 0) > 125));
  const [isShowComment, setIsShowComment] = useState(false);

  const isCanDelete = useMemo(() => {
    if (Number(userId) == initiative.id) {
      return true;
    } else {
      return false;
    }
  }, [initiative, userId]);

  const handleOpen = () => {
    setIsShowText(true);
  };

  const handleDelete = () => {
    dispatch(
      modalShow<DeletePostProps>("DELETE_POST", { id, triggerUrl })
    );
  };

  const handleShowComment = useCallback(() => {
    setIsShowComment((e) => !e);
  }, [isShowComment, setIsShowComment]);

  return (
    <>
      <Wrapper>
        <Hero>
          <Avatar href={`/profile/${initiative.id}`} />
          <Title>
            <Name>
              <Link href={`/profile/${initiative.id}`}>
                <a>{initiative.company}</a>
              </Link>
            </Name>
            <Time>{renderTimestamp(post_time)}</Time>
          </Title>
        </Hero>
        <Inner>
          {title && (
            <Text>
              {isShowText ? (
                title
              ) : (
                <>
                  {`${title.substr(0, 125)} ...`}
                  <span onClick={handleOpen}>Смотреть полностью</span>
                </>
              )}
            </Text>
          )}
          {picture && (
            <img alt={title ? title : initiative.company} src={picture} />
          )}
          <Bottom>
            <Like id={id} amount={num_likes} isLiked={is_liked} />
            <CommentIcon
              amount={num_comments}
              isShow={isShowComment}
              onShow={handleShowComment}
            />
          </Bottom>
        </Inner>
        {isCanDelete && <Close onClick={handleDelete} />}
        {isShowComment && <Comments postId={id} />}
        {last_comment && !isShowComment && (
          <LastComment>
            <CommentItem
              id={last_comment.id}
              name={last_comment.initiative.company}
              timestamp={last_comment.timestamp}
              commentUserId={last_comment.initiative.id}
              content={last_comment.content}
              postId={id}
              isLast={true}
            />
          </LastComment>
        )}
      </Wrapper>
    </>
  );
};

export const PostItem = memo(PostItemComponent);
