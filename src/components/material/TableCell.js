import {TableCell, styled} from '@mui/material';

const TableCellc = styled(TableCell)({
  textAlign: 'center',
  // fontSize: 11,
  padding: 2,
  borderBottom: 'none',
  height: 30,
});

const Custome = (props) => <TableCellc {...props} />;
export default Custome;
