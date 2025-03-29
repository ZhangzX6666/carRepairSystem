import { Layout, Typography } from 'antd';
import Header from '../../components/layout/qxHeader';

const { Content } = Layout;
const { Title } = Typography;

const PerformancePage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content style={{ padding: '24px' }}>
        <Title level={2}>员工业绩</Title>
        <p>这里是员工业绩分析页面，您可以查看员工的工作表现和绩效数据。</p>
        <p>功能包括：</p>
        <ul>
          <li>查看员工工作量统计</li>
          <li>分析服务质量评价</li>
          <li>比较员工绩效</li>
          <li>生成业绩报表</li>
          <li>设置绩效目标</li>
        </ul>
      </Content>
    </Layout>
  );
};

export default PerformancePage;