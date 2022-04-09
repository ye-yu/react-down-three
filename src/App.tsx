import { Layout } from 'antd';
import Counter from './components/Counter';
import './App.css';
import 'antd/dist/antd.min.css';
import { useStores } from './stores';
import { themes } from './constants/theme';

const { Header, Footer, Content } = Layout;

function App() {
  const { preference } = useStores()
  const theme = themes[preference.activeTheme]
  return (
    <Layout>
      <Header style={{ textAlign: "center", ...theme.header }}><span style={{ color: theme.highlight }}>Three</span> to One</Header>
      <Content>
        <Counter />
      </Content>
      <Footer>
        Footer
      </Footer>
    </Layout>
  );
}

export default App;
