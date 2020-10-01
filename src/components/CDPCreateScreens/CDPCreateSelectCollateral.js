import React from 'react';
import {
  Box,
  Grid,
  Table,
  Radio,
  Overflow,
  Card
} from '@makerdao/ui-components-core';
import { TextBlock } from 'components/Typography';
import { prettifyNumber, formatter } from 'utils/ui';
import useCdpTypes from 'hooks/useCdpTypes';
import useLanguage from 'hooks/useLanguage';
import useAnalytics from 'hooks/useAnalytics';
import ScreenFooter from '../ScreenFooter';
import ScreenHeader from '../ScreenHeader';
import BigNumber from 'bignumber.js';

const CDPCreateSelectCollateralSidebar = () => {
  const { lang } = useLanguage();
  return (
    <Box px="l" py="m">
      <Grid
        gridTemplateColumns={{ s: 'initial', l: '3fr 3fr 3fr' }}
        gridGap="m"
        my="l"
      >
        {[
          [lang.stability_fee, lang.cdp_create.stability_fee_description],
          [
            lang.liquidation_ratio,
            lang.cdp_create.liquidation_ratio_description
          ],
          [
            lang.liquidation_penalty,
            lang.cdp_create.liquidation_penalty_description
          ]
        ].map(([title, text]) => (
          <div key={title}>
            <TextBlock t="h5" lineHeight="normal" mb="m">
              {title}
            </TextBlock>
            <TextBlock t="body">{text}</TextBlock>
          </div>
        ))}
      </Grid>
    </Box>
  );
};

function IlkTableRow({
  ilk,
  checked,
  gemBalance,
  isFirstVault,
  dispatch,
  ilkData
}) {
  const { trackInputChange } = useAnalytics('SelectCollateral', 'VaultCreate');
  const { annualStabilityFee, liquidationRatio, liquidationPenalty } = ilkData;

  async function selectIlk() {
    trackInputChange('CollateralType', {
      selectedCollateral: ilk.symbol,
      isFirstVault
    });
    dispatch({
      type: 'set-ilk',
      payload: {
        gem: ilk.gem,
        symbol: ilk.symbol,
        gemBalance,
        currency: ilk.currency
      }
    });
  }
  const disabled = ilk.gem === 'TUSD';

  //TODO: avoid hotfix
  let symbol = ilk.symbol;
  if (symbol === 'DAI') {
    symbol = 'CSC';
  }
  if (symbol === 'MANA-A') {
    symbol = 'CT1-A';
  }
  let gem = ilk.gem;
  if (gem === 'DAI') {
    gem = 'CSC';
  }
  if (gem === 'MANA') {
    gem = 'CT1';
  }
  return (
    <tr
      style={disabled ? { color: '#ADADAD' } : { whiteSpace: 'nowrap' }}
      onClick={() => !disabled && selectIlk()}
    >
      <td>
        <Radio
          disabled={disabled}
          checked={checked}
          readOnly
          mr="xs"
          css={{
            appearance: 'none'
          }}
        />
      </td>
      <td>
        <div>{symbol}</div>
        {disabled && (
          <div style={{ fontSize: '11px', paddingBottom: '5px' }}>
            Unavailable due to a token upgrade
          </div>
        )}
      </td>
      <td>
        {formatter(annualStabilityFee, {
          percentage: true,
          rounding: BigNumber.ROUND_HALF_UP
        })}{' '}
        %
      </td>
      <td>{formatter(liquidationRatio, { percentage: true })} %</td>
      <td>{formatter(liquidationPenalty, { percentage: true })} %</td>
      <td css="text-align: right">
        {gem === 'USDC'
          ? prettifyNumber(gemBalance, { truncate: true })
          : prettifyNumber(gemBalance)}{' '}
        {gem}
      </td>
    </tr>
  );
}

const CDPCreateSelectCollateral = ({
  selectedIlk,
  isFirstVault,
  hasAllowance,
  proxyAddress,
  balances,
  collateralTypesData,
  dispatch
}) => {
  const { trackBtnClick } = useAnalytics('SelectCollateral', 'VaultCreate');
  const { lang } = useLanguage();
  const { cdpTypes } = useCdpTypes();
  console.log('CDPCreateSelectCollateral cdpTypes', cdpTypes);
  const hasAllowanceAndProxy = hasAllowance && !!proxyAddress;

  return (
    <Box
      maxWidth="1040px"
      css={`
        margin: 0 auto;
      `}
    >
      <ScreenHeader
        title={lang.cdp_create.select_title}
        text={lang.cdp_create.select_text}
      />
      <Grid
        gridTemplateColumns={{ s: 'initial', l: 'initial' }}
        gridGap="m"
        my="l"
      >
        <div>
          <Card px="l" py="l">
            <Overflow x="scroll" y="visible">
              <Table
                width="100%"
                css={`
                  th,
                  td {
                    padding-right: 10px;
                  }
                `}
              >
                <thead>
                  <tr css="white-space: nowrap;">
                    <th />
                    <th>{lang.collateral_type}</th>
                    <th>{lang.stability_fee}</th>
                    <th>{lang.liquidation_ratio_shortened}</th>
                    <th>{lang.liquidation_penalty_shortened}</th>
                    <th css="text-align: right">{lang.your_balance}</th>
                  </tr>
                </thead>
                <tbody>
                  {cdpTypes.map(
                    ilk =>
                      collateralTypesData &&
                      balances[ilk.gem] && (
                        <IlkTableRow
                          key={ilk.symbol}
                          checked={ilk.symbol === selectedIlk.symbol}
                          dispatch={dispatch}
                          ilk={ilk}
                          gemBalance={balances[ilk.gem]}
                          isFirstVault={isFirstVault}
                          ilkData={collateralTypesData.find(
                            x => x.symbol === ilk.symbol
                          )}
                        />
                      )
                  )}
                </tbody>
              </Table>
            </Overflow>
          </Card>
        </div>
        <Card>
          <CDPCreateSelectCollateralSidebar />
        </Card>
      </Grid>
      <ScreenFooter
        onNext={() => {
          trackBtnClick('Next', {
            selectedCollateral: selectedIlk.symbol,
            isFirstVault
          });
          dispatch({
            type: 'increment-step',
            payload: { by: hasAllowanceAndProxy ? 2 : 1 }
          });
        }}
        onBack={() => {
          trackBtnClick('Back', { isFirstVault });
          dispatch({ type: 'decrement-step' });
        }}
        canGoBack={false}
        canProgress={!!selectedIlk.symbol}
      />
    </Box>
  );
};
export default CDPCreateSelectCollateral;
