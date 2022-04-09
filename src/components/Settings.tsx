import { Divider, Layout } from "antd";
import { observer } from "mobx-react";
import { Row } from 'antd';
import { Button } from 'antd';
import { useStores } from "../stores";
import { Difficulty } from "../constants/difficulty";

function Settings() {
  const { appState } = useStores()
  return <Layout>
    <Divider orientation="center">Settings</Divider>
    <Row justify="space-around">
      <Button onClick={() => appState.setDifficulty(Difficulty.Easy)} autoFocus={false} type={appState.difficulty === Difficulty.Easy ? "primary" : "default"} style={{margin: "auto"}}>Easy</Button>
      <Button onClick={() => appState.setDifficulty(Difficulty.Intermediate)} autoFocus={false} type={appState.difficulty === Difficulty.Intermediate ? "primary" : "default"} style={{margin: "auto"}}>Intermediate</Button>
      <Button onClick={() => appState.setDifficulty(Difficulty.Expert)} autoFocus={false} type={appState.difficulty === Difficulty.Expert ? "primary" : "default"} style={{margin: "auto"}}>Expert</Button>
    </Row>
  </Layout>
}

export default observer(Settings)

