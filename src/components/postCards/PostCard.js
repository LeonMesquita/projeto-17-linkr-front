import { useContext, useState } from "react";

import UserContext from "../../contexts/UserContext";

import styled from "styled-components";
import { CardContainer, PostContentSide, PostSide } from "./style";

import DeletePost from "./DeletePost";

export default function PostCard() {
  const { user } = useContext(UserContext);
  const [toggle, setToggle] = useState(false);
  

  return (
    <CardContainer className="post">
      <PostContentSide>
        <img src={user.pictureUrl} alt="" />
      </PostContentSide>
      <PostSide>
        <PostInfos>
          <PostTop>
            <h1>Juvenal</h1>
            <div className="icons">
              <ion-icon name="pencil-outline"></ion-icon>
              <ion-icon name="trash-outline" onClick={()=>setToggle(!toggle)}></ion-icon>
              <DeletePost toggle = {toggle} setToggle={setToggle}/>
            </div>
          </PostTop>
          <span>
            Muito maneiro esse tutorial de Material UI com React, deem uma
            olhada!
          </span>
          <UrlContainer>
            <UrlDescriptionSide>
              <h1>Como aplicar o Material UI em um projeto React</h1>
              <span>
                Hey! I have moved this tutorial to my personal blog. Same
                content, new location. Sorry about making you click through to
                another page.
              </span>
              <h2>https://medium.com/@pshrmn/a-simple-react-router</h2>
            </UrlDescriptionSide>
            <UrlImageSide></UrlImageSide>
          </UrlContainer>
        </PostInfos>
      </PostSide>
    </CardContainer>
  );
}

const PostInfos = styled.div`
  h1,
  span {
    font-weight: 400;
  }
  h1 {
    margin-bottom: 7px;
    font-size: 19px;
    line-height: 23px;
    color: #ffffff;
  }

  span {
    font-size: 17px;
    line-height: 20px;
    color: #b7b7b7;
  }
  @media screen and (max-width: 431px) {
    h1,
    span {
      font-weight: 400;
    }
    h1 {
      font-size: 17px;
      line-height: 20px;
    }
    span {
      font-size: 15px;
      line-height: 18px;
    }
  }
`;

const PostTop = styled.div`
  display: flex;
  width: 100%;

  .icons {
    display: flex;
    width: 100%;
    justify-content: end;
    align-items: center;
  }

  ion-icon {
    color: #fff;
    margin-left: 12.5px;
    width: 18px;
    height: 18px;
    cursor: pointer;
  }
`;

const UrlContainer = styled.div`
  display: flex;
  width: 100%;
  height: 155px;
  margin-top: 10px;
  border: 1px solid #4d4d4d;
  border-radius: 11px;
`;

const UrlDescriptionSide = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 24px 20px;
  h1,
  span,
  h2 {
    font-weight: 400;
  }
  h1 {
    margin-bottom: 0px;
    font-size: 16px;
    line-height: 19px;
    color: #cecece;
  }
  span {
    font-size: 11px;
    line-height: 13px;
    color: #9b9595;
  }
  h2 {
    font-size: 11px;
    line-height: 13px;
    color: #cecece;
  }
  @media screen and (max-width: 431px) {
    h1 {
      font-size: 11px;
      line-height: 13px;
      color: #cecece;
    }
    span,
    h2 {
      font-size: 9px;
      line-height: 11px;
      color: #9b9595;
    }
    h2 {
      color: #cecece;
    }
  }
`;

const UrlImageSide = styled.div``;

