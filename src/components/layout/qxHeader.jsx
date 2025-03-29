import { Layout, Typography, Button } from 'antd';
import { HomeOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = () => {
  const navigate = useNavigate();

  return (
    <AntHeader style={{ 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'space-between',
      background: '#fff',
      boxShadow: '0 2px 8px #f0f1f2',
      zIndex: 1
    }}>
      <Title level={4} style={{ margin: 0 }}>汽修管理后台</Title>
      <Button 
        type="text" 
        icon={<HomeOutlined />}
        onClick={() => navigate('/')}
      >
        主页
      </Button>
    </AntHeader>
  );
};

export default Header;