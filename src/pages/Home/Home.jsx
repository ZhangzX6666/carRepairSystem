import { Container, Grid, Card, CardContent, Typography, Button, Box } from '@mui/material';
import Header from '../../components/layout/qxHeader';
import { 
  Assignment as OrderIcon,
  Assessment as PerformanceIcon,
  People as MemberIcon,
  AttachMoney as FinanceIcon,
  Inventory as InventoryIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const featureCards = [
    {
      title: '工单管理',
      description: '创建、跟踪和管理维修工单',
      icon: <OrderIcon fontSize="large" />,
      path: '/orders',
      color: '#4caf50'
    },
    {
      title: '员工业绩',
      description: '查看和分析员工工作绩效',
      icon: <PerformanceIcon fontSize="large" />,
      path: '/performance',
      color: '#2196f3'
    },
    {
      title: '会员管理',
      description: '管理会员信息和会员权益',
      icon: <MemberIcon fontSize="large" />,
      path: '/members',
      color: '#ff9800'
    },
    {
      title: '财务管理',
      description: '查看收支情况和财务报表',
      icon: <FinanceIcon fontSize="large" />,
      path: '/finance',
      color: '#9c27b0'
    },
    {
      title: '库存管理',
      description: '管理汽车配件和耗材库存',
      icon: <InventoryIcon fontSize="large" />,
      path: '/inventory',
      color: '#f44336'
    }
  ];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, flex: 1 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4 }}>
          汽修管理后台首页
        </Typography>
        <Grid container spacing={4}>
          {featureCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card 
                sx={{ 
                  height: '100%', 
                  width:'90vw',
                  display: 'flex', 
                  flexDirection: 'column',
                  transition: 'transform 0.3s',
                  '&:hover': {
                    transform: 'scale(1.03)',
                    boxShadow: 6
                  }
                }}
              >
                <CardContent sx={{ flexGrow: 1, textAlign: 'center' }}>
                  <Box 
                    sx={{
                      width: 80,
                      height: 80,
                      borderRadius: '50%',
                      backgroundColor: `${card.color}20`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                      color: card.color
                    }}
                  >
                    {card.icon}
                  </Box>
                  <Typography gutterBottom variant="h5" component="h2">
                    {card.title}
                  </Typography>
                  <Typography sx={{ mb: 3 }}>
                    {card.description}
                  </Typography>
                </CardContent>
                <Box sx={{ p: 2, textAlign: 'center' }}>
                  <Button 
                    variant="contained" 
                    onClick={() => navigate(card.path)}
                    sx={{ 
                      backgroundColor: card.color,
                      '&:hover': {
                        backgroundColor: card.color,
                        opacity: 0.9
                      }
                    }}
                  >
                    进入
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;