import { Layout, Typography } from 'antd';
import Header from '../../components/layout/qxHeader';

const { Content } = Layout;
const { Title } = Typography;

const InventoryPage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content style={{ padding: '24px' }}>
        <Title level={2}>库存管理</Title>
        <p>这里是库存管理页面，您可以管理汽修店的所有配件和耗材库存。</p>
        <p>功能包括：</p>
        <ul>
          <li>查看当前库存</li>
          <li>添加新配件</li>
          <li>设置库存预警</li>
          <li>管理供应商信息</li>
          <li>记录进货出货</li>
        </ul>
      </Content>
    </Layout>
  );
};

export default InventoryPage;