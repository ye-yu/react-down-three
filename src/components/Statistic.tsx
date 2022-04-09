import { Layout, Row, Typography, Modal, Button, Table } from "antd";
import { observer } from "mobx-react";
import { useStores } from "../stores";
import { AppState } from "../stores/app-state.store";
import { Difficulty } from "../constants/difficulty";

const { Content } = Layout
const { Text } = Typography;

function showStatistic(appState: AppState) {
  const tableData = [
    {
      key: "Easy",
      Wins: appState.record[Difficulty.Easy],
      Time: appState.time[Difficulty.Easy],
    },
    {
      key: "Intermediate",
      Wins: appState.record[Difficulty.Intermediate],
      Time: appState.time[Difficulty.Intermediate],
    },
    {
      key: "Expert",
      Wins: appState.record[Difficulty.Expert],
      Time: appState.time[Difficulty.Expert],
    },
  ]
  const columns = [
    {
      title: "Wins",
      dataIndex: "Wins",
      key: "key"
    },
    {
      title: "Time",
      dataIndex: "Time",
      key: "key"
    },
  ]
  
  const modal = Modal.info({
    title: 'Game Statistic',
    content: <>
      <Table dataSource={tableData} columns={columns} />
      <Button onClick={() => deleteGameStatisticUpdate()}>Reset Statistic</Button>

    </>,
    onOk() { },
    cancelText: "Reset Statistic"
  });

  const deleteGameStatisticUpdate = () => modal.update({
    content: "Delete game statistic?",
    onOk() {
      appState.reset()
    }
  })
}

function Statistic() {
  const { appState } = useStores()
  return (
    <Layout>
      <Content>
        <Row justify="space-around" style={{ paddingTop: "1rem", paddingBottom: "1rem" }}>
          <Text type="secondary">Success: {appState.successCount}</Text>
          <Text type="secondary">Games: {appState.gamePlayed}</Text>
        </Row>
        <Row justify="center">
          <Button onClick={() => showStatistic(appState)}>Show Statistic</Button>
        </Row>
      </Content>
    </Layout>
  )
}

export default observer(Statistic)