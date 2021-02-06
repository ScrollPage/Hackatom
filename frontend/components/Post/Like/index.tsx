import { likePost } from "@/store/actions/post";
import React, { memo, useContext } from "react";
import { useDispatch } from "react-redux";
import { Wrapper, Main, Amount } from "./styles";
import { PostsContext, PostsContextProps } from "../Posts";

interface LikeProps {
  amount: number;
  id: number;
  isLiked: boolean;
}

const LikeComponent: React.FC<LikeProps> = ({ amount, isLiked, id }) => {
  const dispatch = useDispatch();
  const { triggerUrl } = useContext(PostsContext) as PostsContextProps;

  const handleChange = () => {
    dispatch(likePost(triggerUrl, id));
  };

  return (
    <Wrapper>
      <Main onClick={handleChange}>
        <svg
          width="29"
          height="27"
          viewBox="0 0 29 27"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.5 26.3866C14.0871 26.3866 13.6891 26.2371 13.3789 25.9654C12.2074 24.941 11.0779 23.9783 10.0813 23.1291L10.0763 23.1247C7.15463 20.6349 4.63169 18.4848 2.87628 16.3668C0.913992 13.9989 0 11.7539 0 9.30129C0 6.9184 0.817084 4.72004 2.30058 3.11087C3.80177 1.48267 5.86163 0.585938 8.10136 0.585938C9.77536 0.585938 11.3084 1.11517 12.6578 2.15882C13.3388 2.68562 13.9561 3.33035 14.5 4.08239C15.044 3.33035 15.6611 2.68562 16.3423 2.15882C17.6918 1.11517 19.2248 0.585938 20.8988 0.585938C23.1383 0.585938 25.1984 1.48267 26.6996 3.11087C28.1831 4.72004 28.9999 6.9184 28.9999 9.30129C28.9999 11.7539 28.0862 13.9989 26.1239 16.3665C24.3685 18.4848 21.8458 20.6347 18.9246 23.1243C17.9263 23.9748 16.795 24.939 15.6208 25.9658C15.3109 26.2371 14.9126 26.3866 14.5 26.3866V26.3866ZM8.10136 2.28471C6.34175 2.28471 4.72528 2.98697 3.54932 4.26227C2.35589 5.55682 1.69855 7.34631 1.69855 9.30129C1.69855 11.364 2.46519 13.2088 4.1841 15.2829C5.84548 17.2876 8.31664 19.3935 11.1779 21.8319L11.1832 21.8363C12.1835 22.6888 13.3174 23.6553 14.4975 24.6872C15.6848 23.6533 16.8205 22.6853 17.8227 21.8315C20.6837 19.3931 23.1547 17.2876 24.8161 15.2829C26.5348 13.2088 27.3014 11.364 27.3014 9.30129C27.3014 7.34631 26.644 5.55682 25.4506 4.26227C24.2749 2.98697 22.6582 2.28471 20.8988 2.28471C19.6098 2.28471 18.4263 2.69447 17.3813 3.50249C16.4501 4.22289 15.8014 5.13356 15.421 5.77077C15.2255 6.09844 14.8812 6.29403 14.5 6.29403C14.1188 6.29403 13.7745 6.09844 13.5789 5.77077C13.1988 5.13356 12.5501 4.22289 11.6186 3.50249C10.5736 2.69447 9.39016 2.28471 8.10136 2.28471V2.28471Z"
            fill={isLiked ? "#0099FF" : "#000"}
          />
        </svg>
      </Main>
      <Amount>{amount}</Amount>
    </Wrapper>
  );
};

export const Like = memo(LikeComponent);
