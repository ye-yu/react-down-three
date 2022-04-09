import { Divider, Layout, Row, Typography } from "antd";
import { observer } from "mobx-react";
import { GameResult } from "../constants/game-result";
import { useStores } from "../stores";

const { Content } = Layout
const { Text } = Typography;

function Stage() {
  const { appState } = useStores()

  const getGameTitle = () => {
    if (appState.gameStarted) return "Three to One!"
    switch(appState.gameResult) {
      case GameResult.None: return "Start Game"
      case GameResult.Win: return "Win!"
      case GameResult.Lose: return "Lose!"
    }
  }

  return (
    <Layout>
      <Content>
        <Divider style={{fontSize: "1.3rem"}}>{getGameTitle()}</Divider>
        <Row justify="center">
          <Text style={{fontSize: "4rem"}}>{appState.selectedNumber}</Text>
        </Row>
      </Content>
    </Layout>
  )
}

export default observer(Stage)