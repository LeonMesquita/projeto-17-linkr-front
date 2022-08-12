import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { CardContainer, PostContentSide, PostSide } from "../style.js";
import DeletePost from "./DeletePost";
import EditPost from "./EditPost";

export default function PostCard({author,author_pic,description,url}){

  const [erase, setErase] = useState(false);
  const [edit, setEdit] = useState(false);

  const urldata = {
    url: "",
    title: "",
    siteName: "",
    description: "",
    mediaType: "",
    contentType: "",
    images: [],
    favicons: [],
    videos: [],
  };

  const [data, setData] = useState(urldata);

  let body = {
    url: url,
  };

  useEffect(() => {
    const promise = axios.post(
      `https://linkr-back-api.herokuapp.com/urls`,
      body
    ); 
    promise.then((res) => {
      setData(res.data);

      console.log(data);
    });
    promise.catch(() => {});
  });

    return(
        <>
        {data ? (
                <CardContainer className="post">
                <PostContentSide>
                    <img src={author_pic} alt="user" />
                </PostContentSide>
                <PostSide>
                    <PostInfos>
                    <PostTop>
                      <h1>{author}</h1>
                      <div className="icons">
                        <ion-icon
                          name="pencil-outline"
                          onClick={() => setEdit(!edit)}
                        ></ion-icon>
                        <ion-icon
                          name="trash-outline"
                          onClick={() => setErase(!erase)}
                        ></ion-icon>
                        <DeletePost erase={erase} setErase={setErase} />
                      </div>
                    </PostTop>
                    {edit ? (
                      <EditPost edit={edit} setEdit={setEdit} />
                    ) : (
                      <span>{description}</span>
                    )}
                        <UrlContainer>
                            <UrlDescriptionSide>
                                <h1>{data.title}</h1>
                                <span>{data.description}</span>
                                <h2>{url}</h2>
                            </UrlDescriptionSide>
                            <UrlImageSide>
                                <img src={data.favicons[0]} alt={data.title}></img>
                            </UrlImageSide>
                        </UrlContainer>
                    </PostInfos>
                </PostSide>
            </CardContainer>
            )
            : (<h1>Loading . . . </h1>)
        }
        </>
    )
};


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

const UrlImageSide = styled.div`
  img {
    width: 153.44px;
    height: 153.44px;
  }
`;
