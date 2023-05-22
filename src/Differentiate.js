import React, { useEffect, useRef, useState } from "react";
import { styled } from "styled-components";

export default function Differentiate({ children }) {
  const imgRef = useRef();
  const [Height, setHeight] = useState();
  const [Mode, setMode] = useState(true);
  useEffect(() => {
    setHeight(imgRef.current.height);
  }, [imgRef]);

  console.log(Height);

  return (
    <Container blend={Mode ? "difference" : "normal"}>
      <div
        className="App"
        style={{
          height: `max(100%,${Height}px)`,
        }}
      >
        {children}
      </div>
      <img src="/design/desktop-error-empty.jpg" alt="working" ref={imgRef} />
      <button
        className={`${Mode ? "active" : ""}`}
        onClick={() => setMode(!Mode)}
      >
        <span></span>
      </button>
    </Container>
  );
}

const Container = styled.main`
  width: 1440px;
  height: 100dvh;
  margin: 0 auto;
  position: relative;
  & > .App {
    position: relative;
    z-index: 1;
    mix-blend-mode: ${(props) => props?.blend};
    background-color: white;
    width: 100%;
    height: 100%;
  }
  & > img {
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    height: auto;
    border: 0;
    outline: 0;
    /* z-index: 2; */
    /* mix-blend-mode: difference; */
  }
  & > button {
    padding: 3px 5px;
    border-radius: 16px;
    width: 44px;
    position: absolute;
    top: 10px;
    right: 10px;
    display: flex;
    height: max-content;
    z-index: 100;
    border: none;
    outline: none;
    background-color: aqua;
    justify-content: start;
    &.active {
      justify-content: end;
      background-color: white;
      & > span {
        background-color: black;
      }
    }
    & > span {
      width: 16px;
      aspect-ratio: 1/1;
      border-radius: 50%;
      background-color: aliceblue;
    }
  }
`;
