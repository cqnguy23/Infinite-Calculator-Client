import { Divider, Input, message } from "antd";
import React from "react";
import api from "../axios";
import {
  checkCalculationFormat,
  formatNumberString,
} from "../helpers/stringUtils";

const CalculationDisplay = ({ currentSession, setCurrentSession }) => {
  const calculations = currentSession?.calculationLogs || [];
  const onEnter = async (e) => {
    const input = e.target.value;
    if (!checkCalculationFormat(input))
      message.error("Wrong calculation format");
    else {
      const filterRegex = /\s*(\+|-|\*)\s*/g;
      const expression = input.split(filterRegex);
      const firstOperand = expression[0];
      const operation = expression[1];
      const secondOperand = expression[2];
      let calculation = {
        firstOperand,
        operation,
        secondOperand,
      };
      if (currentSession)
        calculation = { ...calculation, sessionID: currentSession._id };
      const resp = await api.post("/calculation", calculation);
      const data = resp.data;
      setCurrentSession(data.owner);
    }
  };
  return (
    <>
      <div
        style={{
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "end",
          padding: "24px 10px 0 0",
          overflow: "auto",
        }}
      >
        {calculations.map((calculation) => {
          return (
            <>
              <div style={{ fontSize: "14px" }}>
                {formatNumberString(calculation.firstOperand)}{" "}
                <span style={{ color: "red" }}>
                  {formatNumberString(calculation.operation)}{" "}
                </span>
                {formatNumberString(calculation.secondOperand)}
              </div>
              <div style={{ fontWeight: "500", fontSize: "26px" }}>
                {formatNumberString(calculation.result)}
              </div>
              <Divider />
            </>
          );
        })}
      </div>
      <div>
        <Input style={{ minHeight: "50px" }} onPressEnter={onEnter} />
      </div>
    </>
  );
};

export default CalculationDisplay;
