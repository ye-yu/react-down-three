import React from 'react';
import { Layout, Row } from 'antd';
import Counter from './components/Counter';
import './App.css';
import 'antd/dist/antd.min.css';
import { useStores } from './stores';
import { themes } from './constants/theme';
import Settings from './components/Settings';

const { Header, Footer, Content } = Layout;

declare global {
  interface Window { 
    getStoreState(): ReturnType<typeof useStores>
  }
}

function App() {
  const store = useStores()
  const { preference } = store
  const theme = themes[preference.activeTheme]
  React.useEffect(() => {
    window.getStoreState = () => store
  })
  return (
    <Layout>
      <Header style={{ textAlign: "center", ...theme.header }}>
        <span style={{ color: theme.highlight }}>Three</span> to <span style={{ color: theme.blue1 }}>One</span>
      </Header>
      <Content>
        <Row>
          <Counter />
        </Row>
        <Row>
          <Settings />
        </Row>
      </Content>
      <Footer>
      </Footer>
    </Layout>
  );
}

export default App;
