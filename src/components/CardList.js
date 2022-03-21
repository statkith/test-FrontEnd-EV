import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card3 from './Card3';

const useGridStyles = makeStyles(({ breakpoints }) => ({
  root: {
    [breakpoints.up('md')]: {
      justifyContent: 'center',
    },
  },
}));

export const CardList = React.memo(function SolidGameCard() {
  const gridStyles = useGridStyles();
  return (
    <>
      <Grid classes={gridStyles} container spacing={4} wrap={'nowrap'}>
        <Grid item>
          <Card3 />
        </Grid>
        <Grid item>
          <Card3 />
        </Grid>
        <Grid item>
          <Card3 />
        </Grid>
        <Grid item>
          <Card3 />
        </Grid>
      </Grid>
    </>
  );
});
export default CardList