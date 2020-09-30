import { useState } from 'react';
import useMaker from 'hooks/useMaker';
import useActionState from 'hooks/useActionState';
import { watch } from 'hooks/useObservable';
import BigNumber from 'bignumber.js';

export default function useTokenAllowance(tokenSymbol) {
  const { maker, account } = useMaker();

  const proxyAddress = watch.proxyAddress(account?.address);
  const allowance = watch.tokenAllowance(
    account?.address,
    proxyAddress || undefined,
    tokenSymbol
  );

  const hasFetchedAllowance = proxyAddress === null || allowance !== undefined;
  const hasAllowance =
    tokenSymbol === 'ETH' ||
    (allowance !== undefined && allowance !== null && !allowance.eq(0));

  const hasSufficientAllowance = value =>
    BigNumber(value).isLessThanOrEqualTo(allowance);

  const [startedWithoutAllowance, setStartedWithoutAllowance] = useState(false);
  const [setAllowance, allowanceLoading, , allowanceErrors] = useActionState(
    async () => {
      console.log('setAllowance', tokenSymbol);
      try {
        const token = maker.getToken(tokenSymbol);
        console.log('token', token);
        const txPromise = token.approveUnlimited(proxyAddress);
        console.log('txPromise', txPromise);
        txPromise.catch(e => {
          console.error('txPromise catch', e);
        });
        setStartedWithoutAllowance(true);
        return await txPromise;
      } catch (e) {
        console.error('catch', e);
      }
    }
  );

  return {
    hasAllowance,
    hasFetchedAllowance,
    setAllowance,
    allowanceLoading,
    allowanceErrors,
    startedWithoutAllowance,
    allowance,
    hasSufficientAllowance
  };
}
