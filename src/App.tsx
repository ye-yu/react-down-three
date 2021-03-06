import React from 'react';
import { Button, Col, Grid, Layout, Modal, Row } from 'antd';
import './App.css';
import 'antd/dist/antd.min.css';
import { useStores } from './stores';
import { themes } from './constants/theme';
import Settings from './components/Settings';
import TimeLapse from './components/TimeLapse';
import Stage from './components/Stage';
import Statistic from './components/Statistic';
import Controls from './components/Controls';
import { BranchesOutlined, GithubOutlined } from '@ant-design/icons';
import { GenerateNumber } from './helpers/NumberGenerator';
import { Difficulty } from './constants/difficulty';
import BGIMG from './assets/bg.jpg';

const { Header, Content } = Layout;
const { useBreakpoint } = Grid


declare global {
  interface Window {
    getStoreState(): ReturnType<typeof useStores> | undefined
  }
}

const keyDownListener = (event: KeyboardEvent) => {
  const store = window.getStoreState()
  if (!store) return
  const { appState } = store
  switch (event.code) {
    case "ArrowDown": {
      appState.rerenderKeyPress("Down")
      if (!appState.gameStarted) return
      return appState.down()
    }
    case "ArrowLeft": {
      appState.rerenderKeyPress("Left")
      if (!appState.gameStarted) return
      return appState.decrement()
    }
    case "ArrowRight": {
      appState.rerenderKeyPress("Right")
      if (!appState.gameStarted) return
      return appState.increment()
    }
    case "Space": {
      appState.rerenderKeyPress("Space")
      if (appState.gameStarted) return
      return appState.startGame()
    }
    case "Escape": {
      appState.rerenderKeyPress("Escape")
      if (!appState.gameStarted) return
      return appState.lose()
    }
  }
}

function showGuide() {
  const transitionDuration = 2000
  let number = GenerateNumber(Difficulty.Easy)

  const getTutorialMessage = () => {
    if (number === 1) return "The game ends if the final number is a 1. Do it as fast as you can!"
    const remainder = number % 3
    switch (remainder) {
      case 0: return "Yes, start divide by three!"
      case 1: return "No, but it will be if you minus 1!"
      case 2: return "No, but it will be if you add 1!"
    }
  }

  const getTutorialAction = () => {
    if (number === 1) return ""
    const remainder = number % 3
    switch (remainder) {
      case 0: return <>&divide; 3 = {number / 3}</>
      case 1: return <>- 1 = {number - 1}</>
      case 2: return <>+ 1 = {number + 1}</>
    }
  }

  const getModalContent = (fadeIn = false) => <Content>
    <Row>
      Is your number divisible by <span style={{ fontWeight: "bold", paddingLeft: 5 }}>three</span>?
    </Row>
    <Row>
      <h1>{number}</h1>
      <h1 style={fadeIn ? {
        paddingLeft: 10,
        color: "maroon",
        transition: "color ease 500ms",
        transitionDelay: "500ms",
      } : {
        paddingLeft: 10,
        color: "white",
      }}>{getTutorialAction()}</h1>
    </Row>
    <Row style={fadeIn ? {
      color: "inherit",
      transition: "color ease 500ms",
      transitionDelay: "500ms",
    } : {
      color: number === 1 ? "inherit" : "white",
    }}>
      {getTutorialMessage()}
    </Row>
  </Content>
  const modal = Modal.info({
    title: <h2>How to Play</h2>,
    content: getModalContent(),
    onOk() { number = 1 },
  })

  setTimeout(() => {
    modal.update({
      content: getModalContent(true)
    })

    setTimeout(() => {
      startAnimation()
    }, transitionDuration)
  }, 500)

  const startAnimation = () => {
    if (number === 1) return
    const remainder = number % 3
    switch (remainder) {
      case 0: number = number / 3; break;
      case 1: number = number - 1; break;
      case 2: number = number + 1; break;
    }

    modal.update({
      content: getModalContent()
    })

    setTimeout(() => {
      modal.update({
        content: getModalContent(true)
      })

      setTimeout(() => {
        startAnimation()
      }, transitionDuration)
    }, 500)
  }
}

function App() {
  const store = useStores()
  const { preference } = store
  const theme = themes[preference.activeTheme]
  const [init, setDoneInit] = React.useState(false)
  React.useEffect(() => {
    if (init) return
    window.getStoreState = () => store
    window.removeEventListener("keydown", keyDownListener)
    window.addEventListener("keydown", keyDownListener)

    setDoneInit(true)
  }, [init])

  const bp = useBreakpoint()

  return (
    <Layout style={{
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
      backgroundImage: `url(${BGIMG})`,
      minHeight: "100vh",
      height: "100%",
    }}>
      <Header style={theme.header.title}>
        <Row align="middle" justify="center" gutter={[10, 10]}>
          <span style={{ marginRight: 5, fontSize: "1.5rem" }}><BranchesOutlined /></span>
          {bp.sm && <Col>
            <span style={{ color: theme.highlight, fontSize: "1.2rem", fontWeight: "bold" }}>Three</span>
            <span>&nbsp;to&nbsp;</span>
            <span style={{ color: theme.blue1, fontSize: "1.2rem", fontWeight: "bold" }}>One</span>
          </Col>
          }
          {!bp.sm && <Col style={{ marginRight: "auto" }}>
            <span style={{ color: theme.highlight, fontSize: "1.2rem", fontWeight: "bold" }}>3</span>
            <span>&nbsp;to&nbsp;</span>
            <span style={{ color: theme.blue1, fontSize: "1.2rem", fontWeight: "bold" }}>1</span>
          </Col>
          }
          {
            bp.sm && <Col style={{ fontSize: "1.5rem" }}>
              |
            </Col>
          }
          <Col>
            <Button onClick={() => showGuide()}>How to Play</Button>
          </Col>
          {
            bp.sm && <Col>
              <Button icon={<GithubOutlined />} onClick={() => window.open("https://github.com/ye-yu/react-down-three", "_blank")}>Source</Button>
            </Col>
          }
          {
            !bp.sm && <Col>
              <Button icon={<GithubOutlined />} onClick={() => window.open("https://github.com/ye-yu/react-down-three", "_blank")} />
            </Col>
          }
        </Row>
      </Header>
      <Content style={{ width: "95%", maxWidth: 900, margin: "auto", marginTop: "1rem" }}>
        <Row>
          <Stage />
        </Row>
        <Row>
          <TimeLapse />
        </Row>
        <Row>
          <Statistic />
        </Row>
        <Row>
          <Controls />
        </Row>
        <Row>
          <Settings />
        </Row>
      </Content>
    </Layout>
  );
}

export default App;
