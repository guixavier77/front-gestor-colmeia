import { CircularProgress } from '@mui/material';
import React, { useState } from 'react';

const Loading = ({text }: { text?: string }) => {


  return (
    <div className='flex flex-col justify-center items-center h-screen gap-4'>
      <CircularProgress style={{ fontSize: 36, color: '#FFCB08' }} />
      <p className='text-yellow font-semibold'>{text || 'Carregando...'}</p>
    </div>
  );
};

export default Loading;
