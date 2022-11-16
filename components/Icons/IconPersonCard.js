import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { AuthContext } from "../../context";
import UpdateUser from "../ModalComponents/UpdateCollaborator";
import DeleteUserAdmin from "../ModalComponents/DeleteUserAdmin";
import Router from "next/router";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import DailyInfo from "../Daily/DailyInfo";
import DeleteUserManager from "../ModalComponents/DeleteUserManager/DeleteUserManager";

function IconPersonCard({ item }) {
  const state = useContext(AuthContext);
  const [isManager] = state.User.isManager;
  const [isCollaborator] = state.User.isCollaborator;
  const [isAdmin] = state.User.isAdmin;

  const kanbaLink = (id, userId) => {
    let paramID = id.substring(7);
    Router.push({
      pathname: `/KanbaBoard/${paramID}`,
      query: { keyword: userId },
    });
  };
  return (
    <>
      {/* CHARTS*/}
      {isManager ? (
        <>
         <DailyInfo item={item}/>
          &nbsp;&nbsp;
          {/* Activity */}
          <OverlayTrigger
            overlay={
              <Tooltip id={`tooltip-bottom`}>
                <strong>KanbaBoard</strong>.
              </Tooltip>
            }
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              fill="currentColor"
              className="bi bi-list-task"
              viewBox="0 0 16 16"
              type="submit"
              onClick={() =>
                kanbaLink(`${item._id}&${item.name}&${item.lastName}`, item._id)
              }
            >
              <path
                fillRule="evenodd"
                d="M2 2.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5V3a.5.5 0 0 0-.5-.5H2zM3 3H2v1h1V3z"
              />
              <path d="M5 3.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zM5.5 7a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9zm0 4a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1h-9z" />
              <path
                fillRule="evenodd"
                d="M1.5 7a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H2a.5.5 0 0 1-.5-.5V7zM2 7h1v1H2V7zm0 3.5a.5.5 0 0 0-.5.5v1a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-1a.5.5 0 0 0-.5-.5H2zm1 .5H2v1h1v-1z"
              />
            </svg>
          </OverlayTrigger>
          {/* Delete user */}
          &nbsp;&nbsp;
          <DeleteUserManager item={item}/>
        </>
      ) : (
        <>
          &nbsp;&nbsp;
          <DeleteUserAdmin item={item} />
        </>
      )}
      &nbsp;&nbsp;
      <UpdateUser item={item} />
    </>
  );
}

export default IconPersonCard;
