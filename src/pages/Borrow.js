import React, { useEffect } from 'react';
import { hot } from 'react-hot-loader/root';
import { useNavigation } from 'react-navi';
import styled from 'styled-components';
import AccountSelection from 'components/AccountSelection';
import { Routes } from 'utils/constants';
import useMaker from 'hooks/useMaker';
import useLanguage from 'hooks/useLanguage';
import { Box, Position, Text } from '@makerdao/ui-components-core';
import {
  ConnectHero,
  ThickUnderline,
  FixedHeaderTrigger,
  Parallaxed,
  StyledPageContentLayout,
  PageHead
} from 'components/Marketing';

// import useCdpTypes from 'hooks/useCdpTypes';

const Ball = styled.div`
  width: ${props => props.size};
  height: ${props => props.size};
  border-radius: 50%;
`;

const FrontBall = styled(Ball)`
  background: radial-gradient(
    51.51% 110.6% at 32.77% 50%,
    #d2ff72 0%,
    #fdc134 100%
  );
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.15);
`;

const HeroBackground = (() => {
  const BlurryBall = styled(Ball).attrs(() => ({
    size: '154px'
  }))`
    position: absolute;
    top: 7px;
    right: -110px;
    background: radial-gradient(
      51.51% 110.6% at 32.77% 50%,
      #e8ffb7 0%,
      #ffe29d 100%
    );
    filter: blur(20px);

    @media (min-width: ${props => props.theme.breakpoints.m}) {
      top: 56px;
    }
  `;

  const SmallBlurryBall = styled(Ball).attrs(() => ({
    size: '72px'
  }))`
    position: absolute;
    top: 434px;
    left: 143px;
    background: radial-gradient(
      51.51% 110.6% at 32.77% 50%,
      #eaffcf 0%,
      #fedb88 100%
    );
    filter: blur(13px);
  `;

  const DimBall = styled(Ball)`
    background: linear-gradient(271.64deg, #fff1cd 0%, #fefea5 100%);
  `;

  const Pos = styled(Position)`
    position: absolute;
  `;

  return () => (
    <Box
      width="100%"
      zIndex="-1"
      height="670px"
      style={{ position: 'absolute' }}
    >
      <Box maxWidth="866px" m="0 auto">
        <BlurryBall />
        <Pos top={{ s: '-30px', m: '-17px' }} left={{ s: '-86px', m: '-83px' }}>
          <DimBall size="280px" />
          <Parallaxed
            style={{ position: 'absolute', top: '-36px', left: '-67px' }}
          >
            <FrontBall size="186px" />
          </Parallaxed>
          <SmallBlurryBall />
        </Pos>
        <Pos
          top={{ s: '306px', m: '270px' }}
          right={{ s: '-105px', m: '-18px' }}
        >
          <DimBall size="182px" />
          <Parallaxed
            style={{ position: 'absolute', top: '98px', left: '-33px' }}
          >
            <FrontBall size="86px" />
          </Parallaxed>
        </Pos>
      </Box>
    </Box>
  );
})();

// disableConnect is for testing
function Borrow({ disableConnect = false }) {
  const { account } = useMaker();
  const navigation = useNavigation();
  const { lang } = useLanguage();

  useEffect(() => {
    async function redirect() {
      if (!disableConnect && account) {
        const { search } = (await navigation.getRoute()).url;
        navigation.navigate({
          pathname: `/${Routes.BORROW}/owner/${account.address}`,
          search
        });
      }
    }
    redirect();
  }, [account, navigation, disableConnect]);

  // const { cdpTypesList } = useCdpTypes();
  // const prices = watch.collateralTypesPrices(
  //   cdpTypesList?.length ? cdpTypesList : []
  // );

  return (
    <StyledPageContentLayout>
      <PageHead
        title={lang.borrow_landing.meta.title}
        description={lang.borrow_landing.meta.description}
        imgUrl="https://oasis.app/meta/Oasis_Borrow.png"
      />
      <FixedHeaderTrigger>
        <ConnectHero>
          <HeroBackground />
          <ThickUnderline background="linear-gradient(176.36deg, #FFE9E9 26.84%, #FFDB87 97.79%)">
            <Text.h4>{lang.borrow_landing.page_name}</Text.h4>
          </ThickUnderline>
          <Text.h1 className="headline">{lang.borrow_landing.headline}</Text.h1>
          <Box minHeight="81px" maxWidth="720px">
            <Text>{lang.borrow_landing.subheadline}</Text>
          </Box>
          <Text fontSize="s" className="connect-to-start">
            {lang.borrow_landing.connect_to_start}
          </Text>
          <AccountSelection className="button" />
        </ConnectHero>
      </FixedHeaderTrigger>
    </StyledPageContentLayout>
  );
}

export default hot(Borrow);
