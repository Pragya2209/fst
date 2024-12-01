import React from 'react';
import { CircularProgress, Box } from '@mui/material';  // You can use other loader components like LinearProgress
import { loaderStyles } from '../styles';

export const Loader = () => {
  return (
    <Box style={loaderStyles.container}>
    <CircularProgress color="primary" size={60} />
    </Box>
  );
};