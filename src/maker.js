import Maker from '@makerdao/dai';
import McdPlugin, {
  ETH,
  BAT,
  USDC,
  USD,
  DAI,
  SAI,
  CSC,
  CT1,
  defaultCdpTypes
} from '@makerdao/dai-plugin-mcd';
import trezorPlugin from '@makerdao/dai-plugin-trezor-web';
import ledgerPlugin from '@makerdao/dai-plugin-ledger-web';
import walletLinkPlugin from '@makerdao/dai-plugin-walletlink';
import walletConnectPlugin from '@makerdao/dai-plugin-walletconnect';
import dcentPlugin from 'dai-plugin-dcent-web';
import configPlugin from '@makerdao/dai-plugin-config';
import networkConfig from './references/config';
import { networkNameToId } from './utils/network';
import { getQueryParamByName } from './utils/dev';
import ilkList from './references/ilkList';
import abiMap from '@makerdao/dai-plugin-mcd/contracts/abiMap';

import rinkebyAddresses from './references/contracts/rinkeby';
import goerliAddresses from './references/contracts/goerli';
import ropstenAddresses from './references/contracts/ropsten';
import kovanAddresses from './references/contracts/kovan';

let _maker;

const otherNetworksOverrides = [
  {
    network: 'rinkeby',
    contracts: rinkebyAddresses
  },
  { network: 'goerli', contracts: goerliAddresses },
  { network: 'ropsten', contracts: ropstenAddresses },
  { network: 'kovan', contracts: kovanAddresses }
].reduce((acc, { network, contracts }) => {
  for (const [contractName, contractAddress] of Object.entries(contracts)) {
    if (!acc[contractName]) acc[contractName] = {};
    acc[contractName][network] = contractAddress;
  }
  return acc;
}, {});

export function getMaker() {
  if (_maker === undefined) throw new Error('Maker has not been instatiated');
  return _maker;
}

export async function instantiateMaker({
  rpcUrl,
  network,
  testchainId,
  backendEnv
}) {
  const addressOverrides = ['rinkeby', 'ropsten', 'goerli', 'kovan'].some(
    networkName => networkName === network
  )
    ? otherNetworksOverrides
    : {};

  console.log('addressOverrides', addressOverrides);
  const configCdpTypes = defaultCdpTypes
    .filter(type => {
      console.log('type', type, 'ilkList', ilkList);
      return !ilkList.some(item => item.symbol === type.ilk);
    })
    // .concat([
    //   { currency: CSC, ilk: 'CSC-A', abi: abiMap['MCD_DAI'] }
    // ])
    .concat(
      ilkList.map(ilk => ({
        ilk: ilk.symbol,
        currency: ilk.currency,
        abi: abiMap['OMG']
      }))
    );

  console.log('configCdpTypes', configCdpTypes);
  const mcdPluginConfig = {
    defaultCdpTypes: configCdpTypes,
    cdpTypes: configCdpTypes,
    prefetch: false,
    addressOverrides
  };
  const walletLinkPluginConfig = {
    rpcUrl: networkConfig.rpcUrls[networkNameToId(network)]
  };

  const addContracts = {};
  //'CSC',
  ['CT1'].concat(Object.keys(addressOverrides)).forEach(symbol => {
    addContracts[symbol] = [
      {
        abi: abiMap[symbol] || abiMap['OMG'],
        address: addressOverrides[symbol][network],
        version: 1
      }
    ];
  });

  // console.log('addContracts', addContracts);

  const config = {
    log: false,
    plugins: [
      trezorPlugin,
      ledgerPlugin,
      [walletLinkPlugin, walletLinkPluginConfig],
      walletConnectPlugin,
      dcentPlugin,
      [McdPlugin, mcdPluginConfig]
    ],
    smartContract: {
      addressOverrides,
      addContracts
    },
    provider: {
      url: rpcUrl,
      type:
        network === 'testnet'
          ? 'HTTP'
          : getQueryParamByName('ws') === '0'
          ? 'HTTP'
          : 'WEBSOCKET'
    },
    web3: {
      pollingInterval: network === 'testnet' ? 100 : null
    },
    gas: {
      apiKey: '3e722dd73e76ba3d2eb7507e316727db8a71d1fbc960ed1018e999a53f75'
    },
    multicall: true
  };

  // Use the config plugin, if we have a testchainConfigId
  if (testchainId) {
    delete config.provider;
    config.plugins.push([configPlugin, { testchainId, backendEnv }]);
  } else if (!rpcUrl) {
    if (config.provider.type === 'HTTP')
      rpcUrl = networkConfig.rpcUrls[networkNameToId(network)];
    else if (config.provider.type === 'WEBSOCKET')
      rpcUrl = networkConfig.wsRpcUrls[networkNameToId(network)];
    else throw new Error(`Unsupported provider type: ${config.provider.type}`);
    if (!rpcUrl) throw new Error(`Unsupported network: ${network}`);
    config.provider.url = rpcUrl;
  }

  const maker = await Maker.create('http', config);

  // for debugging
  window.maker = maker;

  return maker;
}

export { USD, DAI, ETH, BAT, SAI, USDC, CSC, CT1 };
