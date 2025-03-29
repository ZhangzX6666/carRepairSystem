import { Layout, Typography } from 'antd';
import Header from '../../components/layout/qxHeader';

const { Content } = Layout;
const { Title } = Typography;

const FinancePage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content style={{ padding: '24px' }}>
        <Title level={2}>财务管理</Title>
        <p>这里是财务管理页面，您可以查看和分析汽修店的财务状况。</p>
        <p>功能包括：</p>
        <ul>
          <li>查看每日收支</li>
          <li>生成财务报表</li>
          <li>分析收入来源</li>
          <li>管理支出记录</li>
          <li>设置财务目标</li>
        </ul>
      </Content>
    </Layout>
  );
};

export default FinancePage;