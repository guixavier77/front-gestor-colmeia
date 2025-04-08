import React from 'react'
import { Table as MuiTable, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'
import { colors } from '@/utils/colors/colors';

interface TableProps {
  columns: Array<{ header: string; field: string}>
  data: any[]
  onRowClick?: (row: any) => void
  rowKey: string
  sx?: object
}

const TableDash: React.FC<TableProps> = ({ columns, data, onRowClick, rowKey, sx }) => {
  return (
    <TableContainer
      component={Paper}
      sx={{
        ...sx,
        boxShadow: 3, 
        borderRadius: '8px',
        height: 274
      }}
    >
      <MuiTable>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: colors.black, 
              color: '#FFFFFF', 
              textAlign: 'left',
            }}
          >
            {columns.map((col, index) => (
              <TableCell
                key={index}
                sx={{
                  fontWeight: 'bold',
                  padding: '12px',
                  color: '#FFFFFF',
                }}
              >
                {col.header}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row[rowKey]}
              hover
              onClick={() => onRowClick && onRowClick(row)}
              sx={{
                cursor: onRowClick ? 'pointer' : 'default',
                '&:nth-of-type(even)': {
                  backgroundColor: colors.gray, 
                },
                '&:hover': {
                  backgroundColor: '#EDEDED', 
                },
              }}
            >
              {columns.map((col, index) => (
                <TableCell
                  key={index}
                  sx={{
                    padding: '12px',
                    color: '#1D1D1D',
                  }}
                >
                  {row[col.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  )
}

export default TableDash
