import React, { useMemo, useState } from 'react'
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  InputAdornment,
} from '@mui/material'
import { colors } from '@/utils/colors/colors'
import PaginationDash from '../PaginationDash'
import SearchIcon from '@mui/icons-material/Search'
import InputStyled from '../input'

interface TableProps {
  columns: Array<{
    header: string
    field: string
    render?: (value: any, row?: any) => React.ReactNode
  }>
  data: any[]
  onRowClick?: (row: any) => void
  rowKey: string
  sx?: object
  pagination?: boolean
  itemsPerPage?: number
}

const TableDash: React.FC<TableProps> = ({
  columns,
  data,
  onRowClick,
  rowKey,
  sx,
  pagination = true,
  itemsPerPage = 10,
}) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')

  const isFewColumns = columns.length <= 3

  const filteredData = useMemo(() => {
    if (!searchTerm) return data
    return data.filter((row) =>
      columns.some((col) =>
        String(row[col.field]).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
  }, [data, columns, searchTerm])

  const numberPages = Math.ceil(filteredData.length / itemsPerPage)

  const dataToDisplay = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    return filteredData.slice(startIndex, endIndex)
  }, [currentPage, filteredData])

  return (
    <div className="relative flex flex-col gap-4 mt-10 h-[80%] justify-between">

      <div>
        <div className="flex justify-end mb-4">

          <InputStyled 
            id='search'
            type='search'
            styles='border-gray bg-none '
            stylesInput='bg-none'
            icon={ <SearchIcon style={{color: colors.black}}/>}
            onChange={(e) => {
              setSearchTerm(e.target.value)
              setCurrentPage(1) 
            }}
            placeholder='Buscar...'
        
          />
        </div>

        <TableContainer
          component={Paper}
          sx={{
            ...sx,
            boxShadow: 3,
            borderRadius: '8px',
            overflowX: 'auto',
            maxHeight: 400,
          }}
        >
          <MuiTable
            sx={{
              minWidth: isFewColumns ? 500 : '100%',
              tableLayout: 'auto',
            }}
          >
            <TableHead>
              <TableRow sx={{ backgroundColor: colors.black }}>
                {columns.map((col, index) => (
                  <TableCell
                    key={index}
                    sx={{
                      fontWeight: 'bold',
                      padding: isFewColumns ? '10px 16px' : '12px',
                      color: '#FFFFFF',
                      textAlign: 'left',
                      fontSize: '16px'
                    }}
                  >
                    {col.header}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {dataToDisplay.map((row) => (
                <TableRow
                  key={row[rowKey]}
                  hover
                  onClick={() => onRowClick?.(row)}
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
                {columns.map((col, index) => {
                    const value = row[col.field]
                    return (
                      <TableCell
                        key={index}
                        sx={{
                          padding: isFewColumns ? '10px 16px' : '12px',
                          color: '#1D1D1D',
                          textAlign: 'left',
                          whiteSpace: 'nowrap',
                          fontWeight: 'light'
                        }}
                      >
                        {col.render ? col.render(value, row) : value}
                      </TableCell>
                    )
              })}
                </TableRow>
              ))}
      
            </TableBody>
          </MuiTable>
        </TableContainer>

      </div>

      {pagination && (
        <div className="flex justify-end mt-2 pr-4">
          <PaginationDash
            count={numberPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}

export default TableDash
