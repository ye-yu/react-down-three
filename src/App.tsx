import { Layout } from 'antd';
import Counter from './components/Counter';
import './App.css';
import 'antd/dist/antd.min.css';

const { Header, Footer, Content } = Layout;

function App() {
  return (
    <Layout>
      <Header style={{ textAlign: "center", color: "white", fontWeight: "bold" }}>Three to One</Header>
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
