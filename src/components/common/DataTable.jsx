import { DataGrid } from '@mui/x-data-grid';
import { useMediaQuery, useTheme } from '@mui/material';

const DataTable = ({ rows, columns, loading, onRowClick }) => {
const theme = useTheme();
const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

return (
<div style={{ height: 600, width: '100%' }}>
    <DataGrid
    rows={rows}
    columns={columns}
    pageSize={10}
    rowsPerPageOptions={[10, 25, 50]}
    loading={loading}
    onRowClick={onRowClick}
    disableSelectionOnClick
    density={isMobile ? 'compact' : 'standard'}
    sx={{
        '& .MuiDataGrid-cell:focus': {
        outline: 'none',
        },
    }}
    />
</div>
);
};

export default DataTable;