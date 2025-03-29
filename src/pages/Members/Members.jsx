import { Layout, Typography } from 'antd';
import Header from '../../components/layout/qxHeader';

const { Content } = Layout;
const { Title } = Typography;

const MembersPage = () => {
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Header />
      <Content style={{ padding: '24px' }}>
        <Title level={2}>会员管理</Title>
        <p>这里是会员管理页面，您可以管理所有会员信息和会员权益。</p>
        <p>功能包括：</p>
        <ul>
          <li>添加新会员</li>
          <li>查看会员信息</li>
          <li>管理会员等级</li>
          <li>设置会员优惠</li>
          <li>发送会员通知</li>
        </ul>
      </Content>
    </Layout>
  );
};

export default MembersPage;