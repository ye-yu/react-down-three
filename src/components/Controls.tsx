import { Layout, Row, Col, Typography, Divider, Grid, Button } from "antd";
import { observer } from "mobx-react";
import { useStores } from "../stores";
import "./Controls.css";

const { Content } = Layout
const { Text } = Typography;
const { useBreakpoint } = Grid;

function ControlItem(props: any) {
  return <span {...props} style={{
    border: "1px solid gray",
    padding: "0.2rem",
    display: "inline-block",
    minWidth: 50,
    textAlign: "center",
    borderRadius: "5px",
    margin: "0.5rem",
    marginRight: "1rem",
  }} />
}

function Controls() {
  const { appState } = useStores()
  const bp = useBreakpoint()
  return (
    <Layout>
      <Content>
        <Divider>Controls</Divider>
        {
          bp.sm ? <div style={{ marginBottom: "2rem", paddingLeft: "2rem", paddingRight: "2rem" }} className="controls-parent">
            <div className="controls-div1">
              <Text type="secondary" style={{ fontSize: "1.2rem", margin: "auto" }}><ControlItem>&larr;</ControlItem> <span style={{ fontWeight: "bold" }}>-1</span></Text>
            </div>
            <div className="controls-div2">
              <Text type="secondary" style={{ fontSize: "1.2rem", margin: "auto" }}><ControlItem>&rarr;</ControlItem> <span style={{ fontWeight: "bold" }}>+1</span></Text>
            </div>
            <div className="controls-div3">
              <Text type="secondary" style={{ fontSize: "1.2rem", margin: "auto" }}><ControlItem>&darr;</ControlItem> <span style={{ fontWeight: "bold" }}>&divide;3</span></Text>
            </div>
            <div className="controls-div4">
              <Text type="secondary" style={{ fontSize: "1.2rem", margin: "auto" }}><ControlItem>[space]</ControlItem><span style={{ fontWeight: "bold" }}>New Game</span></Text>
            </div>
            <div className="controls-div5">
              <Text type="secondary" style={{ fontSize: "1.2rem", margin: "auto" }}><ControlItem>[esc]</ControlItem><span style={{ fontWeight: "bold" }}>Forfeit</span></Text>
            </div>
          </div> : <Row gutter={[20, 20]} style={{paddingLeft: "1rem", paddingRight: "1rem"}}>
            <Col span={8}>
              <Button block style={{ fontWeight: "bold" }} onClick={() => appState.decrement()} disabled={!appState.gameStarted}>-1</Button>
            </Col>
            <Col span={8}>
              <Button block style={{ fontWeight: "bold" }} onClick={() => appState.increment()} disabled={!appState.gameStarted}>+1</Button>
            </Col>
            <Col span={8}>
              <Button block style={{ fontWeight: "bold" }} onClick={() => appState.down()} disabled={!appState.gameStarted}>&divide;3</Button>
            </Col>
            <Col span={16}>
              <Button block style={{ fontWeight: "bold" }} onClick={() => appState.startGame()} disabled={appState.gameStarted}>New Game</Button>
            </Col>
            <Col span={8}>
              <Button block style={{ fontWeight: "bold" }} onClick={() => appState.lose()} disabled={!appState.gameStarted}>Forfeit</Button>
            </Col>
          </Row>
        }
      </Content>
    </Layout >
  )
}

export default observer(Controls)