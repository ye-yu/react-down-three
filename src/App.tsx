import { ContextProvider } from './stores';
import { Layout } from 'antd';
import Counter from './components/Counter';
import './App.css';
import 'antd/dist/antd.min.css';


const { Header, Footer, Content } = Layout;

function App() {
  return (
    <ContextProvider>
      <Layout>
        <Header>Hello</Header>
        <Content>
          <Counter />
        </Content>
        <Footer>
          Footer
        </Footer>
      </Layout>
    </ContextProvider>
  );
}

export default App;
