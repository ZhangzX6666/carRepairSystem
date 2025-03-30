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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  useMediaQuery,
  useTheme,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon,
  Input as InputIcon,
  Output as OutputIcon,
  Inventory as InventoryIcon
} from '@mui/icons-material';
import Header from '../../components/layout/qxHeader';

const InventoryPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [parts, setParts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [openStockDialog, setOpenStockDialog] = useState(false);
  const [currentAction, setCurrentAction] = useState(null); // 'in' or 'out'
  const [editingPart, setEditingPart] = useState(null);
  const [formData, setFormData] = useState({
    partNumber: '',
    name: '',
    type: 'engine',
    price: '',
    supplier: '',
    stock: 0
  });
  const [stockQuantity, setStockQuantity] = useState(1);

  // 配件类型选项
  const partTypes = [
    { value: 'engine', label: '发动机部件' },
    { value: 'electrical', label: '电气部件' },
    { value: 'body', label: '车身部件' },
    { value: 'interior', label: '内饰部件' },
    { value: 'tire', label: '轮胎轮毂' },
    { value: 'brake', label: '刹车系统' },
    { value: 'other', label: '其他配件' },
  ];

  // 供应商选项
  const suppliers = [
    { id: 'sup001', name: '丰田原厂配件' },
    { id: 'sup002', name: '本田原厂配件' },
    { id: 'sup003', name: '博世汽车配件' },
    { id: 'sup004', name: '德尔福配件' },
    { id: 'sup005', name: '其他供应商' },
  ];

  // 模拟数据
  const mockParts = [
    {
      id: 'part001',
      partNumber: 'ENG-001',
      name: '发动机机油滤清器',
      type: 'engine',
      price: 120,
      supplier: 'sup001',
      stock: 15,
    },
    {
      id: 'part002',
      partNumber: 'ELE-002',
      name: '蓄电池',
      type: 'electrical',
      price: 450,
      supplier: 'sup003',
      stock: 8,
    },
    {
      id: 'part003',
      partNumber: 'BOD-003',
      name: '前保险杠',
      type: 'body',
      price: 680,
      supplier: 'sup002',
      stock: 3,
    },
    // 更多模拟数据...
  ];

  // 初始化数据
  useState(() => {
    setParts(mockParts);
  }, []);

  // 过滤配件
  const filteredParts = parts.filter(part => {
    return part.partNumber.includes(searchText) || 
           part.name.includes(searchText) ||
           part.type.includes(searchText);
  });

  // 处理表单输入变化
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // 打开新建配件对话框
  const handleOpenDialog = () => {
    setFormData({
      partNumber: '',
      name: '',
      type: 'engine',
      price: '',
      supplier: '',
      stock: 0
    });
    setEditingPart(null);
    setOpenDialog(true);
  };

  // 打开编辑配件对话框
  const handleEditPart = (part) => {
    setFormData({
      partNumber: part.partNumber,
      name: part.name,
      type: part.type,
      price: part.price,
      supplier: part.supplier,
      stock: part.stock
    });
    setEditingPart(part);
    setOpenDialog(true);
  };

  // 打开入库/出库对话框
  const handleOpenStockDialog = (part, action) => {
    setFormData(part);
    setCurrentAction(action);
    setStockQuantity(1);
    setOpenStockDialog(true);
  };

  // 关闭对话框
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setOpenStockDialog(false);
  };

  // 提交配件表单
  const handleSubmit = () => {
    if (editingPart) {
      // 更新配件
      setParts(parts.map(part => 
        part.id === editingPart.id ? { ...part, ...formData } : part
      ));
    } else {
      // 新建配件
      const newPart = {
        ...formData,
        id: `part${new Date().getTime()}`,
      };
      setParts([...parts, newPart]);
    }
    setOpenDialog(false);
  };

  // 处理入库/出库操作
  const handleStockAction = () => {
    const updatedParts = parts.map(part => {
      if (part.id === formData.id) {
        const newStock = currentAction === 'in' 
          ? part.stock + parseInt(stockQuantity)
          : part.stock - parseInt(stockQuantity);
        return { ...part, stock: newStock };
      }
      return part;
    });
    
    setParts(updatedParts);
    setOpenStockDialog(false);
  };

  // 删除配件
  const handleDeletePart = (id) => {
    if (window.confirm('确定要删除此配件吗？')) {
      setParts(parts.filter(part => part.id !== id));
    }
  };

  // 获取供应商名称
  const getSupplierName = (supplierId) => {
    const supplier = suppliers.find(s => s.id === supplierId);
    return supplier ? supplier.name : '未知供应商';
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Header />
      <Box component="main" sx={{ flexGrow: 1, p: isMobile ? 2 : 3 }}>
        <Typography variant="h5" component="h1" gutterBottom sx={{ mb: 3 }}>
          <InventoryIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
          汽车配件库存管理
        </Typography>
        
        {/* 筛选和操作区域 */}
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} sm={8} md={9}>
                <TextField
                  fullWidth
                  label="搜索配件编号/名称/类型"
                  variant="outlined"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  InputProps={{
                    startAdornment: <SearchIcon color="action" />,
                  }}
                />
              </Grid>
              
              <Grid item xs={12} sm={4} md={3}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleOpenDialog}
                  fullWidth
                >
                  新增配件
                </Button>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
        
        {/* 配件列表 */}
        <Card>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="配件库存表">
              <TableHead>
                <TableRow>
                  <TableCell>配件编号</TableCell>
                  <TableCell>配件名称</TableCell>
                  {!isMobile && <TableCell>配件类型</TableCell>}
                  <TableCell align="right">价格(元)</TableCell>
                  {!isMobile && <TableCell>供应商</TableCell>}
                  <TableCell align="right">库存</TableCell>
                  <TableCell align="center">操作</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredParts.map((part) => (
                  <TableRow key={part.id}>
                    <TableCell>{part.partNumber}</TableCell>
                    <TableCell>{part.name}</TableCell>
                    {!isMobile && (
                      <TableCell>
                        {partTypes.find(t => t.value === part.type)?.label || part.type}
                      </TableCell>
                    )}
                    <TableCell align="right">{part.price}</TableCell>
                    {!isMobile && <TableCell>{getSupplierName(part.supplier)}</TableCell>}
                    <TableCell align="right">{part.stock}</TableCell>
                    <TableCell align="center">
                      <IconButton 
                        size="small"
                        color="primary"
                        onClick={() => handleOpenStockDialog(part, 'in')}
                        title="入库"
                      >
                        <InputIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small"
                        color="secondary"
                        onClick={() => handleOpenStockDialog(part, 'out')}
                        title="出库"
                        disabled={part.stock <= 0}
                      >
                        <OutputIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleEditPart(part)}
                        title="编辑"
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small"
                        onClick={() => handleDeletePart(part.id)}
                        color="error"
                        title="删除"
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
        
        {/* 新增/编辑配件对话框 */}
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>
            {editingPart ? '编辑配件信息' : '新增汽车配件'}
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
                <TextField
                  fullWidth
                  name="partNumber"
                  label="配件编号"
                  value={formData.partNumber}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  name="name"
                  label="配件名称"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel id="part-type-label">配件类型</InputLabel>
                  <Select
                    labelId="part-type-label"
                    name="type"
                    value={formData.type}
                    label="配件类型"
                    onChange={handleInputChange}
                  >
                    {partTypes.map(type => (
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
                  name="price"
                  label="单价(元)"
                  type="number"
                  value={formData.price}
                  onChange={handleInputChange}
                  required
                  InputProps={{
                    inputProps: { min: 0 }
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel id="supplier-label">供应商</InputLabel>
                  <Select
                    labelId="supplier-label"
                    name="supplier"
                    value={formData.supplier}
                    label="供应商"
                    onChange={handleInputChange}
                    required
                  >
                    {suppliers.map(supplier => (
                      <MenuItem key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              {editingPart && (
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    name="stock"
                    label="当前库存"
                    type="number"
                    value={formData.stock}
                    onChange={handleInputChange}
                    InputProps={{
                      inputProps: { min: 0 },
                      readOnly: true
                    }}
                  />
                </Grid>
              )}
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>取消</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingPart ? '更新' : '创建'}
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* 入库/出库对话框 */}
        <Dialog
          open={openStockDialog}
          onClose={handleCloseDialog}
          fullWidth
          maxWidth="xs"
        >
          <DialogTitle>
            {currentAction === 'in' ? '配件入库' : '配件出库'}
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
            <Typography variant="subtitle1" gutterBottom>
              配件: {formData.name} ({formData.partNumber})
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              当前库存: {formData.stock}
            </Typography>
            
            <Divider sx={{ my: 2 }} />
            
            <TextField
              fullWidth
              label={currentAction === 'in' ? '入库数量' : '出库数量'}
              type="number"
              value={stockQuantity}
              onChange={(e) => setStockQuantity(e.target.value)}
              InputProps={{
                inputProps: { 
                  min: 1,
                  max: currentAction === 'out' ? formData.stock : undefined
                }
              }}
              sx={{ mt: 2 }}
            />
            
            {currentAction === 'out' && formData.stock < 10 && (
              <Typography variant="body2" color="error" sx={{ mt: 1 }}>
                注意: 当前库存较低，请及时补货
              </Typography>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>取消</Button>
            <Button 
              onClick={handleStockAction} 
              variant="contained"
              color={currentAction === 'in' ? 'primary' : 'secondary'}
            >
              {currentAction === 'in' ? '确认入库' : '确认出库'}
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default InventoryPage;