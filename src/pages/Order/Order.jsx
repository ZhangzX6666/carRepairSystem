import { Layout, Typography } from 'antd';
import Header from '../../components/layout/qxHeader';

const { Content } = Layout;
const { Title } = Typography;

const OrdersPage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content style={{ padding: '24px' }}>
        <Title level={2}>工单管理</Title>
        <p>这里是工单管理页面，您可以在此创建、查看和跟踪所有维修工单。</p>
        <p>功能包括：</p>
        <ul>
          <li>新建维修工单</li>
          <li>查看工单状态</li>
          <li>分配工单给技师</li>
          <li>跟踪工单进度</li>
          <li>完成工单结算</li>
        </ul>
      </Content>
    </Layout>
  );
};

export default OrdersPage;