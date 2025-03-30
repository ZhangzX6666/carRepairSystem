import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TextField,
  useMediaQuery,
  useTheme,
  Tabs,
  Tab,
  Chip,
} from '@mui/material';
import {
  Receipt as ReceiptIcon,
  AttachMoney as AttachMoneyIcon,
  Payment as PaymentIcon,
  Print as PrintIcon,
  Download as DownloadIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Header from '../../components/layout/qxHeader';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const FinancePage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [tabValue, setTabValue] = useState(0);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [transactionType, setTransactionType] = useState('all');
  const [searchText, setSearchText] = useState('');

  // 模拟财务数据
  const [financialData, setFinancialData] = useState({
    summary: {
      totalIncome: 0,
      totalExpense: 0,
      netProfit: 0,
      outstandingPayments: 0
    },
    transactions: [],
    incomeByCategory: [],
    expenseByCategory: []
  });

  // 交易类型选项
  const transactionTypes = [
    { value: 'all', label: '全部类型' },
    { value: 'income', label: '收入' },
    { value: 'expense', label: '支出' },
    { value: 'repair', label: '维修收入' },
    { value: 'part_sale', label: '配件销售' },
    { value: 'supply', label: '配件采购' },
    { value: 'salary', label: '工资支出' },
    { value: 'other', label: '其他' }
  ];

  // 模拟数据加载
  useEffect(() => {
    // 这里应该是API调用，这里使用模拟数据
    const mockData = {
      summary: {
        totalIncome: 58420.50,
        totalExpense: 32415.80,
        netProfit: 26004.70,
        outstandingPayments: 8450.00
      },
      transactions: [
        {
          id: 'TRX-20230001',
          date: '2023-05-10',
          type: 'repair',
          amount: 1200.00,
          category: '维修收入',
          orderId: 'ORD-20230001',
          customer: '张三',
          status: 'completed',
          description: '丰田卡罗拉常规保养'
        },
        {
          id: 'TRX-20230002',
          date: '2023-05-12',
          type: 'part_sale',
          amount: 3500.00,
          category: '配件销售',
          orderId: 'ORD-20230002',
          customer: '李四',
          status: 'completed',
          description: '本田雅阁蓄电池更换'
        },
        {
          id: 'TRX-20230003',
          date: '2023-05-15',
          type: 'supply',
          amount: -6800.00,
          category: '配件采购',
          supplier: '博世汽车配件',
          status: 'completed',
          description: '采购刹车片等配件'
        },
        {
          id: 'TRX-20230004',
          date: '2023-05-18',
          type: 'salary',
          amount: -12500.00,
          category: '工资支出',
          status: 'completed',
          description: '5月员工工资'
        },
        {
          id: 'TRX-20230005',
          date: '2023-05-20',
          type: 'repair',
          amount: 2800.00,
          category: '维修收入',
          orderId: 'ORD-20230005',
          customer: '王五',
          status: 'pending',
          description: '大众速腾发动机维修'
        },
        // 更多模拟数据...
      ],
      incomeByCategory: [
        { name: '维修收入', value: 42000.00 },
        { name: '配件销售', value: 16420.50 },
        { name: '其他收入', value: 0.00 }
      ],
      expenseByCategory: [
        { name: '配件采购', value: 15800.00 },
        { name: '工资支出', value: 12500.00 },
        { name: '房租水电', value: 2500.00 },
        { name: '其他支出', value: 1615.80 }
      ]
    };

    setFinancialData(mockData);
  }, []);

  // 过滤交易记录
  const filteredTransactions = financialData.transactions.filter(transaction => {
    const matchesType = transactionType === 'all' || 
                       transaction.type === transactionType || 
                       (transactionType === 'income' && transaction.amount > 0) ||
                       (transactionType === 'expense' && transaction.amount < 0);
    const matchesSearch = transaction.id.includes(searchText) || 
                         (transaction.customer && transaction.customer.includes(searchText)) ||
                         (transaction.orderId && transaction.orderId.includes(searchText)) ||
                         transaction.description.includes(searchText);
    const matchesDate = (!startDate || new Date(transaction.date) >= startDate) && 
                       (!endDate || new Date(transaction.date) <= endDate);
    
    return matchesType && matchesSearch && matchesDate;
  });

  // 图表颜色
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

  // 处理标签显示
  const renderCustomizedLabel = ({
    cx, cy, midAngle, innerRadius, outerRadius, percent, index, name
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * Math.PI / 180);
    const y = cy + radius * Math.sin(-midAngle * Math.PI / 180);

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central">
        {`${name}: ${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: isMobile ? 2 : 3 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3 }}>
          <AttachMoneyIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          财务管理
        </Typography>
        
        {/* 财务概览卡片 */}
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  总收入
                </Typography>
                <Typography variant="h4" color="success.main">
                  ¥{financialData.summary.totalIncome.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  总支出
                </Typography>
                <Typography variant="h4" color="error.main">
                  ¥{financialData.summary.totalExpense.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  净利润
                </Typography>
                <Typography variant="h4" color={financialData.summary.netProfit >= 0 ? 'success.main' : 'error.main'}>
                  ¥{financialData.summary.netProfit.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  待收款项
                </Typography>
                <Typography variant="h4" color="warning.main">
                  ¥{financialData.summary.outstandingPayments.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        {/* 选项卡 */}
        <Card sx={{ mb: 3 }}>
          <Tabs 
            value={tabValue} 
            onChange={(e, newValue) => setTabValue(newValue)}
            variant={isMobile ? 'scrollable' : 'standard'}
            scrollButtons="auto"
          >
            <Tab label="交易记录" icon={<ReceiptIcon />} iconPosition="start" />
            <Tab label="收入分析" icon={<PaymentIcon />} iconPosition="start" />
            <Tab label="支出分析" icon={<PaymentIcon />} iconPosition="start" />
          </Tabs>
        </Card>
        
        {/* 交易记录面板 */}
        {tabValue === 0 && (
          <Card>
            <CardContent>
              <Grid container spacing={2} alignItems="center" sx={{ mb: 3 }}>
                <Grid item xs={12} sm={6} md={3}>
                  <FormControl fullWidth>
                    <InputLabel id="transaction-type-label">交易类型</InputLabel>
                    <Select
                      labelId="transaction-type-label"
                      value={transactionType}
                      label="交易类型"
                      onChange={(e) => setTransactionType(e.target.value)}
                    >
                      {transactionTypes.map(type => (
                        <MenuItem key={type.value} value={type.value}>{type.label}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="开始日期"
                      value={startDate}
                      onChange={(newValue) => setStartDate(newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                      label="结束日期"
                      value={endDate}
                      onChange={(newValue) => setEndDate(newValue)}
                      renderInput={(params) => <TextField {...params} fullWidth />}
                    />
                  </LocalizationProvider>
                </Grid>
                
                <Grid item xs={12} sm={6} md={3}>
                  <TextField
                    fullWidth
                    label="搜索"
                    variant="outlined"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    InputProps={{
                      startAdornment: <SearchIcon color="action" />,
                    }}
                  />
                </Grid>
              </Grid>
              
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>交易ID</TableCell>
                      <TableCell>日期</TableCell>
                      {!isMobile && <TableCell>类型</TableCell>}
                      <TableCell align="right">金额</TableCell>
                      <TableCell>描述</TableCell>
                      {!isMobile && <TableCell>关联工单</TableCell>}
                      <TableCell>状态</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {filteredTransactions.map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{transaction.id}</TableCell>
                        <TableCell>{transaction.date}</TableCell>
                        {!isMobile && (
                          <TableCell>
                            <Chip 
                              label={transaction.category} 
                              color={transaction.amount > 0 ? 'success' : 'error'}
                              size="small"
                            />
                          </TableCell>
                        )}
                        <TableCell align="right" sx={{ color: transaction.amount > 0 ? 'success.main' : 'error.main' }}>
                          ¥{Math.abs(transaction.amount).toFixed(2)}
                        </TableCell>
                        <TableCell>
                          {transaction.description}
                          {transaction.customer && ` (${transaction.customer})`}
                        </TableCell>
                        {!isMobile && <TableCell>{transaction.orderId || '-'}</TableCell>}
                        <TableCell>
                          <Chip 
                            label={transaction.status === 'completed' ? '已完成' : '待处理'} 
                            color={transaction.status === 'completed' ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                <Button startIcon={<PrintIcon />} sx={{ mr: 2 }}>
                  打印报表
                </Button>
                <Button startIcon={<DownloadIcon />} variant="contained">
                  导出数据
                </Button>
              </Box>
            </CardContent>
          </Card>
        )}
        
        {/* 收入分析面板 */}
        {tabValue === 1 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                收入分析
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    收入分类占比
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={financialData.incomeByCategory}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {financialData.incomeByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`¥${value.toFixed(2)}`, '金额']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    月度收入趋势
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: '1月', 收入: 12000 },
                          { name: '2月', 收入: 9800 },
                          { name: '3月', 收入: 15000 },
                          { name: '4月', 收入: 13500 },
                          { name: '5月', 收入: 18420 },
                        ]}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`¥${value}`, '收入']} />
                        <Legend />
                        <Bar dataKey="收入" fill="#82ca9d" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
        
        {/* 支出分析面板 */}
        {tabValue === 2 && (
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                支出分析
              </Typography>
              
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    支出分类占比
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={financialData.expenseByCategory}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={renderCustomizedLabel}
                          outerRadius={120}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {financialData.expenseByCategory.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`¥${value.toFixed(2)}`, '金额']} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" gutterBottom>
                    月度支出趋势
                  </Typography>
                  <Box sx={{ height: 300 }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart
                        data={[
                          { name: '1月', 支出: 8500 },
                          { name: '2月', 支出: 7200 },
                          { name: '3月', 支出: 10500 },
                          { name: '4月', 支出: 9800 },
                          { name: '5月', 支出: 12415 },
                        ]}
                        margin={{
                          top: 5,
                          right: 30,
                          left: 20,
                          bottom: 5,
                        }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => [`¥${value}`, '支出']} />
                        <Legend />
                        <Bar dataKey="支出" fill="#ff6b6b" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        )}
      </Box>
    </Box>
  );
};

export default FinancePage;