import "./App.css";
import "antd/dist/antd.css";
import { Col, Layout, Row } from "antd";
import { Header } from "antd/lib/layout/layout";
import CalculationDisplay from "./components/CalculationDisplay";
import { useEffect, useState } from "react";
import api from "./axios";
import SessionDisplay from "./components/SessionDisplay";
function App() {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState();
  useEffect(() => {
    const getSessions = async () => {
      const resp = await api.get("/calculation");
      const sessions = await resp.data;
      setSessions(sessions);
    };
    getSessions();
  }, [sessions]);
  return (
    <Layout style={{ height: "100vh", fontFamily: "'Roboto', sans-serif" }}>
      <Header style={{ color: "white", fontSize: "20px", height: "10vh" }}>
        Infinite Number Calculator
      </Header>
      <Row style={{ height: "100%" }}>
        <Col
          span={18}
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <CalculationDisplay
            currentSession={currentSession}
            setCurrentSession={setCurrentSession}
          />
        </Col>
        <Col
          span={6}
          style={{
            borderLeft: "1px solid black",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <SessionDisplay
            sessions={sessions}
            setCurrentSession={setCurrentSession}
          />
        </Col>
      </Row>
    </Layout>
  );
}

export default App;
