import React from "react";
import { Layout, Row, Col, Typography, Divider, Grid, Button } from "antd";
import { observer } from "mobx-react";
import { themes } from "../constants/theme";
import { useStores } from "../stores";
import "./Controls.css";

const { Content } = Layout
const { Text } = Typography;
const { useBreakpoint } = Grid;

function _ControlItem(props: any) {
  const { appState, preference } = useStores()
  const theme = themes[preference.activeTheme]
  const [color, setColor] = React.useState(theme.blue1)

  React.useEffect(() => {
    setColor(theme.blue1)
    setTimeout(() => {
      setColor("gray")
    }, 200)
  }, [appState.keyPressAnimationSeed[props.controlname as never]])
  
  return <span {...props} style={{
    padding: "0.2rem",
    display: "inline-block",
    minWidth: 50,
    textAlign: "center",
    borderRadius: "5px",
    margin: "0.5rem",
    marginRight: "1rem",
    transition: color === "gray" ? "all 200ms ease" : "none",
    borderColor: color,
    borderWidth: 1,
    borderStyle: "solid",
    backgroundColor: color === "gray" ? undefined : theme.blue1Light,
  }} />
}

const ControlItem = observer(_ControlItem)

function Controls() {
  const { appState } = useStores()
  const bp = useBreakpoint()
  return (
    <Layout style={{padding: "0 1rem"}}>
      <Content>
        <Divider>Controls</Divider>
        {
          bp.sm ? <div style={{ marginBottom: "2rem", paddingLeft: "2rem", paddingRight: "2rem" }} className="controls-parent">
            <div className="controls-div1">
              <Text type="secondary" style={{ fontSize: "1.2rem", margin: "auto" }}>
                <ControlItem controlname="Left">&larr;</ControlItem> <span style={{ fontWeight: "bold" }}>-1</span>
              </Text>
            </div>
            <div className="controls-div2">
              <Text type="secondary" style={{ fontSize: "1.2rem", margin: "auto" }}>
                <ControlItem controlname="Right">&rarr;</ControlItem> <span style={{ fontWeight: "bold" }}>+1</span>
              </Text>
            </div>
            <div className="controls-div3">
              <Text type="secondary" style={{ fontSize: "1.2rem", margin: "auto" }}>
                <ControlItem controlname="Down">&darr;</ControlItem> <span style={{ fontWeight: "bold" }}>&divide;3</span>
              </Text>
            </div>
            <div className="controls-div4">
              <Text type="secondary" style={{ fontSize: "1.2rem", margin: "auto" }}>
                <ControlItem controlname="Space">[space]</ControlItem><span style={{ fontWeight: "bold" }}>New Game</span>
              </Text>
            </div>
            <div className="controls-div5">
              <Text type="secondary" style={{ fontSize: "1.2rem", margin: "auto" }}>
                <ControlItem controlname="Escape">[esc]</ControlItem><span style={{ fontWeight: "bold" }}>Forfeit</span>
              </Text>
            </div>
          </div> : <Row gutter={[20, 20]} style={{ paddingLeft: "1rem", paddingRight: "1rem" }}>
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