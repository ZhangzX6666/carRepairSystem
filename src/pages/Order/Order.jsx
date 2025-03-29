import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import Header from '../../components/layout/qxHeader';

const OrdersPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [orders, setOrders] = useState([]);
  const [selectedOrderType, setSelectedOrderType] = useState('all');
  const [searchText, setSearchText] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    type: 'repair',
    customer: '',
    phone: '',
    carModel: '',
    licensePlate: '',
    amount: '',
    status: 'pending'
  });

  // 工单类型选项
  const orderTypes = [
    { value: 'repair', label: '维修单', color: 'primary' },
    { value: 'sale', label: '销售单', color: 'success' },
    { value: 'film', label: '贴膜单', color: 'warning' },
    { value: 'claim', label: '理赔单', color: 'error' },
    { value: 'quote', label: '报价单', color: 'info' },
  ];

  // 状态选项
  const statusOptions = [
    { value: 'pending', label: '待处理', color: 'default' },
    { value: 'processing', label: '处理中', color: 'primary' },
    { value: 'completed', label: '已完成', color: 'success' },
    { value: 'cancelled', label: '已取消', color: 'error' },
  ];

  // 模拟数据
  const mockOrders = [
    {
      id: 'ORD-20230001',
      type: 'repair',
      customer: '张三',
      phone: '13800138000',
      carModel: '丰田卡罗拉',
      licensePlate: '粤A12345',
      amount: 1200,
      status: 'processing',
      createdAt: '2023-05-10',
    },
    {
      id: 'ORD-20230002',
      type: 'sale',
      customer: '李四',
      phone: '13900139000',
      carModel: '本田雅阁',
      licensePlate: '粤B56789',
      amount: 3500,
      status: 'completed',
      createdAt: '2023-05-12',
    },
    // 更多模拟数据...
  ];

  // 初始化数据
  useState(() => {
    setOrders(mockOrders);
  }, []);

  // 过滤工单
  const filteredOrders = orders.filter(order => {
    const matchesType = selectedOrderType === 'all' || order.type === selectedOrderType;
    const matchesSearch = order.id.includes(searchText) || 
                         order.customer.includes(searchText) || 
                         order.licensePlate.includes(searchText);
    const matchesDate = (!startDate || new Date(order.createdAt) >= startDate) && 
                       (!endDate || new Date(order.createdAt) <= endDate);
    
    return matchesType && matchesSearch && matchesDate;
  });

  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 打开新建工单对话框
  const handleOpenDialog = () => {
    setFormData({
      type: 'repair',
      customer: '',
      phone: '',
      carModel: '',
      licensePlate: '',
      amount: '',
      status: 'pending'
    });
    setEditingOrder(null);
    setOpenDialog(true);
  };

  // 打开编辑工单对话框
  const handleEditOrder = (order) => {
    setFormData({
      type: order.type,
      customer: order.customer,
      phone: order.phone,
      carModel: order.carModel,
      licensePlate: order.licensePlate,
      amount: order.amount,
      status: order.status
    });
    setEditingOrder(order);
    setOpenDialog(true);
  };

  // 关闭对话框
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // 提交表单
  const handleSubmit = () => {
    if (editingOrder) {
      // 更新工单
      setOrders(orders.map(order => 
        order.id === editingOrder.id ? { ...order, ...formData } : order
      ));
    } else {
      // 新建工单
      const newOrder = {
        ...formData,
        id: `ORD-${new Date().getTime()}`,
        createdAt: new Date().toISOString().split('T')[0],
      };
      setOrders([...orders, newOrder]);
    }
    setOpenDialog(false);
  };

  // 删除工单
  const handleDeleteOrder = (id) => {
    if (window.confirm('确定要删除此工单吗？')) {
      setOrders(orders.filter(order => order.id !== id));
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: isMobile ? 2 : 3 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3 }}>
          工单管理
        </Typography>
        
        {/* 筛选和操作区域 */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="order-type-label">工单类型</InputLabel>
                  <Select
                    labelId="order-type-label"
                    value={selectedOrderType}
                    label="工单类型"
                    onChange={(e) => setSelectedOrderType(e.target.value)}
                  >
                    <MenuItem value="all">全部工单</MenuItem>
                    {orderTypes.map(type => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
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
              
              <Grid item xs={12}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenDialog}
                  sx={{ mt: 1 }}
                >
                  新建工单
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        
        {/* 工单列表 */}
        <Card>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="工单表格">
              <TableHead>
                <TableRow>
                  <TableCell>工单编号</TableCell>
                  <TableCell>工单类型</TableCell>
                  {!isMobile && <TableCell>客户姓名</TableCell>}
                  {!isMobile && <TableCell>联系电话</TableCell>}
                  <TableCell>车牌号</TableCell>
                  {!isMobile && <TableCell align="right">金额(元)</TableCell>}
                  <TableCell>状态</TableCell>
                  <TableCell align="center">操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>{order.id}</TableCell>
                    <TableCell>
                      <Chip 
                        label={orderTypes.find(t => t.value === order.type).label}
                        color={orderTypes.find(t => t.value === order.type).color}
                        size="small"
                      />
                    </TableCell>
                    {!isMobile && <TableCell>{order.customer}</TableCell>}
                    {!isMobile && <TableCell>{order.phone}</TableCell>}
                    <TableCell>{order.licensePlate}</TableCell>
                    {!isMobile && <TableCell align="right">{order.amount.toFixed(2)}</TableCell>}
                    <TableCell>
                      <Chip 
                        label={statusOptions.find(s => s.value === order.status).label}
                        color={statusOptions.find(s => s.value === order.status).color}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      <IconButton 
                        size="small"
                        onClick={() => handleEditOrder(order)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleDeleteOrder(order.id)}
                        color="error"
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
        
        {/* 新建/编辑工单对话框 */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {editingOrder ? '编辑工单' : '新建工单'}
            <IconButton
              aria-label="close"
              onClick={handleCloseDialog}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
          </DialogTitle>
          <DialogContent dividers>
            <Grid container spacing={2} sx={{ pt: 1 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="dialog-order-type-label">工单类型</InputLabel>
                  <Select
                    labelId="dialog-order-type-label"
                    name="type"
                    value={formData.type}
                    label="工单类型"
                    onChange={handleInputChange}
                  >
                    {orderTypes.map(type => (
                      <MenuItem key={type.value} value={type.value}>
                        {type.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="customer"
                  label="客户姓名"
                  value={formData.customer}
                  onChange={handleInputChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="phone"
                  label="联系电话"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="carModel"
                  label="车辆型号"
                  value={formData.carModel}
                  onChange={handleInputChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="licensePlate"
                  label="车牌号码"
                  value={formData.licensePlate}
                  onChange={handleInputChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="amount"
                  label="工单金额"
                  type="number"
                  value={formData.amount}
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: '元',
                  }}
                />
              </Grid>
              
              {editingOrder && (
                <Grid item xs={12} sm={6}>
                  <FormControl fullWidth>
                    <InputLabel id="dialog-order-status-label">工单状态</InputLabel>
                    <Select
                      labelId="dialog-order-status-label"
                      name="status"
                      value={formData.status}
                      label="工单状态"
                      onChange={handleInputChange}
                    >
                      {statusOptions.map(status => (
                        <MenuItem key={status.value} value={status.value}>
                          {status.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>取消</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingOrder ? '更新' : '创建'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default OrdersPage;