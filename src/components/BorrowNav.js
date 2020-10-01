import React, { Fragment } from 'react';
import { Link, useCurrentRoute } from 'react-navi';

// import CDPList from 'components/CDPList';
import { Flex, Text } from '@makerdao/ui-components-core';
import { ReactComponent as BorrowIcon } from 'images/curio/borrow.svg';
import { Routes } from 'utils/constants';
import useLanguage from 'hooks/useLanguage';

// import CDPDropdown from './CDPDropdown';

const BorrowNav = ({ viewedAddress, account, mobile, ...props }) => {
  const { url } = useCurrentRoute();
  const { lang } = useLanguage();
  const selected = url.pathname.startsWith(`/${Routes.BORROW}`);

  const address = account
    ? account.address
    : viewedAddress
    ? viewedAddress
    : null;

  const path = address
    ? `/${Routes.BORROW}/owner/${address}`
    : `/${Routes.BORROW}`;

  return (
    <Fragment>
      {mobile && selected ? (
        ''
      ) : (
        // <CDPDropdown selected={selected} account={account} {...props}>
        //   <CDPList
        //     mobile={mobile}
        //     currentPath={url.pathname}
        //     currentQuery={url.search}
        //     viewedAddress={address}
        //   />
        // </CDPDropdown>
        <Link
          href={`${path}${url.search}`}
          className={selected ? 'selected sidebar-link' : 'sidebar-link'}
        >
          <Flex
            bg={!account && selected && 'grey.200'}
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            py="s"
            {...props}
          >
            <BorrowIcon />
            <Text t="p6" fontWeight="bold">
              {lang.navbar.borrow}
            </Text>
          </Flex>
        </Link>
      )}
      {/*{!mobile && (*/}
      {/*  <CDPList*/}
      {/*    currentPath={url.pathname}*/}
      {/*    viewedAddress={address}*/}
      {/*    currentQuery={url.search}*/}
      {/*  />*/}
      {/*)}*/}
    </Fragment>
  );
};

export default BorrowNav;
