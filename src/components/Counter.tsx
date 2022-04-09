import { Button, Layout } from 'antd'
import { observer } from 'mobx-react';
import { useStores } from '../stores'

const { Content } = Layout;

function Counter() {
  const { appState } = useStores()
  return (
    <Layout>
      <Content>
        Counter: { appState.successCount }
      </Content>
      <Content>
        <Button onClick={() => appState.win()}>
          Click
        </Button>
      </Content>
    </Layout>
  )
}

export default observer(Counter)