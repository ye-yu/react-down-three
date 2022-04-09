import React from 'react';
import { Layout, Row } from 'antd';
import './App.css';
import 'antd/dist/antd.min.css';
import { useStores } from './stores';
import { themes } from './constants/theme';
import Settings from './components/Settings';
import TimeLapse from './components/TimeLapse';
import Stage from './components/Stage';
import Statistic from './components/Statistic';
import Controls from './components/Controls';

const { Header, Footer, Content } = Layout;

declare global {
  interface Window {
    getStoreState(): ReturnType<typeof useStores>
  }
}

function App() {
  const store = useStores()
  const { appState, preference } = store
  const theme = themes[preference.activeTheme]
  const [init, setDoneInit] = React.useState(false)
  React.useEffect(() => {
    if (init) return
    window.getStoreState = () => store
    window.addEventListener("keydown", event => {
      console.log("Pressed:", {
        key: event.key,
        code: event.code,
      })
      switch(event.code) {
        case "ArrowDown": {
          if (!appState.gameStarted) return
          return appState.down()
        }
        case "ArrowLeft": {
          if (!appState.gameStarted) return
          return appState.decrement()
        }
        case "ArrowRight": {
          if (!appState.gameStarted) return
          return appState.increment()
        }
        case "Space": {
          if (appState.gameStarted) return
          return appState.startGame()
        }
        case "Escape": {
          if (!appState.gameStarted) return
          return appState.lose()
        }
      }
    })

    setDoneInit(true)
  }, [init])
  return (
    <Layout>
      <Header style={{ textAlign: "center", ...theme.header }}>
        <span style={{ color: theme.highlight }}>Three</span> to <span style={{ color: theme.blue1 }}>One</span>
      </Header>
      <Content style={{ width: "100%", maxWidth: 800, margin: "auto"}}>
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
        <Row style={{marginTop: "2.5rem"}}>
          <Settings />
        </Row>
      </Content>
      <Footer>
      </Footer>
    </Layout>
  );
}

export default App;
