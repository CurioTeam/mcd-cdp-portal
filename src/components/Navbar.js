import React from 'react';
import SaveNav from 'components/SaveNav';
import BorrowNav from 'components/BorrowNav';
// import TradeNav from 'components/TradeNav';
import { Grid, Box } from '@makerdao/ui-components-core';
import useMaker from 'hooks/useMaker';
import { ReactComponent as CurioLogo } from 'images/curio/logo.svg';

const Navbar = ({ viewedAddress }) => {
  const { account } = useMaker();

  return (
    <Box height="100%" className="navbar">
      {/*<Flex alignItems="center" justifyContent="center" py="m" />*/}
      <Grid mx="0px">
        <div className="logo">
          <CurioLogo></CurioLogo>
        </div>
        <SaveNav account={account} />
        <BorrowNav viewedAddress={viewedAddress} account={account} />
        {/*<TradeNav />*/}
      </Grid>
    </Box>
  );
};

export default Navbar;
