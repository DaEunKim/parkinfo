/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useCallback, useEffect, useRef } from "react";
import useAxios from "../hooks/useAxios";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { HANUL_API, PROXY_URL } from "../CONSTANTS/url";
import "./ListPost.css";
import axios from "axios";

function DeleteFunc(id) {
  const ListDeleteUrl = `${PROXY_URL}${HANUL_API}/api/posts/delete/${id}`;
  axios.delete(ListDeleteUrl).then(res => {
    window.location.reload();
  });
}
function LikeState({ id, liked }) {
  const likeUrl = `${PROXY_URL}${HANUL_API}/api/posts/like/${id}`;
  axios.get(likeUrl).then(res => {
    if (liked) {
      res.data.success = false;
    }
    res.data.success = true;
  });
}
function List({ post, index }) {
  const [like, setLike] = useState(0);
  const onChange = useCallback(
    (e, id, liked) => {
      e.preventDefault();

      LikeState({ id, liked });
      if (liked) {
        post.likeCount -= 1;
        return setLike(false);
      }
      post.likeCount += 1;
      return setLike(true);
    },
    [like]
  );

  const state = {
    viewIcon:
      "https://png.pngtree.com/element_origin_min_pic/17/09/29/955b938f7a6dffad4141dafdaf9679d2.jpg",
    likeIcon:
      "https://is1-ssl.mzstatic.com/image/thumb/Purple49/v4/46/57/3f/46573f1e-c430-92d4-1f5d-16ccf43f7b15/source/200x200bb.jpg",
    unlikeIcon:
      "https://i0.wp.com/www.vectorico.com/wp-content/uploads/2018/02/Like-Icon.png?w=623"
  };

  return (
    <div className="post-box">
      <h4 className="post-title">
        <> {`${index + 1}. ${post.title}`}</>
        <button
          className="post-button"
          type="submit"
          onClick={e => {
            e.preventDefault();
            DeleteFunc(post.id);
          }}
        >
          삭제 X
        </button>
      </h4>
      <Link
        to={`/detailcontent?id=${post.id}&time=${post.createTime}&creator=${
          post.creator
        }&title=${post.title}`}
        className="board-list"
      >
        <div>{post.createTime}</div>
        <div>{post.creator}</div>
      </Link>
      <div className="post-bottom">
        <div className="post-bottom-item">
          <img
            className="post-bottom-item-icon"
            width="20px"
            src={state.viewIcon}
          />
          {post.viewCount}
        </div>

        <div className="post-bottom-item">
          <img
            key={`likeimg_${index}`}
            className="post-bottom-item-icon"
            width="20px"
            src={like ? state.likeIcon : state.unlikeIcon}
            onClick={e => {
              e.preventDefault();
              onChange(e, post.id, like);
            }}
          />
          {post.likeCount}
        </div>
      </div>
    </div>
  );
}

export default function ListPost() {
  const ListPostUrl = `${PROXY_URL}${HANUL_API}/api/posts/list`;

  const getListPost = useAxios({
    url: `${ListPostUrl}`,
    method: "get"
  });

  //id마다 like 여부 검사. like 여부에 따라 보여지는 icon 달라야함.

  const { data, isLoading, isError } = getListPost;
  if (isLoading) return <>loading...</>;
  if (!data) return <>null</>;
  if (isError) return <>error</>;

  const { posts } = data;
  if (!posts) {
    return <></>;
  }
  if (posts.length < 1) return <></>;

  return posts.map((post, index) => {
    return (
      <>
        <List post={post} index={index} />
      </>
    );
  });
}
