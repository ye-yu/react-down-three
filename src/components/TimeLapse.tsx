import { Layout, Row, Typography } from "antd";
import { observer } from "mobx-react";
import { useStores } from "../stores";

const { Content } = Layout
const { Text } = Typography;

function TimeLapse() {
  const { appState } = useStores()
  return (
    <Layout style={{padding: "0 1rem"}}>
      <Content>
        <Row justify="center">
          <Text type="secondary" style={{fontSize: "2rem"}}>{(appState.timeLapse / 1000).toFixed(2)} s</Text>
        </Row>
      </Content>
    </Layout>
  )
}

export default observer(TimeLapse)