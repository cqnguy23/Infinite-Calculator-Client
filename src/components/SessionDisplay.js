import { Button } from "antd";
import React from "react";
import api from "../axios";
import { convertToCalendarDate } from "../helpers/stringUtils";

const SessionDisplay = ({ sessions, setCurrentSession }) => {
  const onButtonClick = async (id) => {
    const resp = await api.get(`/calculation/${id}`);
    const session = resp.data;
    setCurrentSession(session);
  };
  return (
    <>
      {sessions.map((session) => {
        return (
          <Button
            key={session._id}
            style={{ width: "100%" }}
            onClick={() => onButtonClick(session._id)}
          >
            {convertToCalendarDate(session.createdAt)}
          </Button>
        );
      })}
    </>
  );
};

export default SessionDisplay;
