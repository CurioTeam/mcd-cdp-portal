import React from 'react';
import { Link, useCurrentRoute } from 'react-navi';
import { Flex, Text } from '@makerdao/ui-components-core';

import { ReactComponent as SaveIcon } from 'images/curio/save.svg';
import { Routes } from '../utils/constants';
import useLanguage from 'hooks/useLanguage';

const SaveNav = ({ account, ...props }) => {
  const { lang } = useLanguage();
  const { url } = useCurrentRoute();
  const selected = url.pathname.startsWith(`/${Routes.SAVE}`);

  // const textColor =
  //   selected && account
  //     ? 'white'
  //     : !selected && account
  //     ? 'gray'
  //     : selected && !account
  //     ? 'black'
  //     : 'gray';

  const saveUrl = account?.address
    ? `/${Routes.SAVE}/owner/${account?.address}${url.search}`
    : `/${Routes.SAVE}${url.search}`;
  return (
    <Link
      href={saveUrl}
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
        <SaveIcon />
        <Text t="p6" fontWeight="bold">
          {lang.navbar.save}
        </Text>
      </Flex>
    </Link>
  );
};

export default SaveNav;
