import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import { colors } from '@/utils/colors/colors';

interface PaginationDashProps {
  count: number;
  currentPage: number;
  setCurrentPage: (page: number) => void;
}



const PaginationDash: React.FC<PaginationDashProps> = ({ count, currentPage, setCurrentPage}) => {
  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    console.log(event);
    setCurrentPage(page);
  };


  return (
    <div>
      <Pagination 
        count={count} 
        onChange={handlePageChange}
        variant="outlined" 
        shape="rounded"
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          '& .MuiPaginationItem-root': {
            backgroundColor: colors.black,
            color: colors.white,
            borderColor: colors.black,
            borderWidth: 0,
            
            '&.Mui-selected': {
              backgroundColor: colors.primary,
              color: colors.black,
              fontWeight: 'bold',
              borderColor: colors.black,
              borderWidth: 0,
            },
            '&:hover': {
              backgroundColor: 'lightgray',
            },
          },
        }}   
      />
    </div>
  );
}

export default PaginationDash;

