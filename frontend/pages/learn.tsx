import Head from "next/head";
import styled from "styled-components";
import AwesomeSlider from "react-awesome-slider";
import { Button } from "@/components/UI/Button";
import { Wrapper as WrapperButton } from "@/components/UI/Button/styles";
import { useRouter } from "next/router";
import { useUser } from "@/hooks/useUser";

export default function Learn() {
  const { push } = useRouter();
  const { userId } = useUser();
  const handleExit = () => {
    push({ pathname: `/profile/${userId}` }, undefined, { shallow: true });
  };

  return (
    <>
      <Head>
        <title>BNET / Обучение</title>
      </Head>
      <Wrapper>
        <Inner>
          <Button width="218px" myType="outline" onClick={handleExit}>
            Выйти
          </Button>
          <AwesomeSlider buttons={true} bullets={true}>
            <div data-src="/slider/Frame 11.png" />
            <div data-src="/slider/Frame 22.png" />
            <div data-src="/slider/Frame 23.png" />
            <div data-src="/slider/Frame 14.png" />
            <div data-src="/slider/Frame 17.png" />
            <div data-src="/slider/Frame 18.png" />
            <div data-src="/slider/Frame 19.png" />
            <div data-src="/slider/Frame 21.png" />
          </AwesomeSlider>
        </Inner>
      </Wrapper>
    </>
  );
}

const Inner = styled.div`
  max-width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  .awssld {
    --loader-bar-color: #0099ff !important;
  }
  .awssld__bullets {
    bottom: 15px;
    z-index: 10;
  }
  .awssld__bullets button {
    background-color: #fff !important;
  }
  .awssld__controls__arrow-right,
  .awssld__controls__arrow-left {
    &:before,
    &:after {
      background-color: #fff !important;
    }
  }
  position: relative;
  ${WrapperButton} {
    position: fixed;
    z-index: 100;
    top: 18px;
    right: 10px;
  }
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 60;
  background-color: #fff;
`;
