import {
  // ETH,
  // BAT,
  // USDC,
  // WBTC,
  // TUSD,
  // ZRX,
  // KNC,
  MANA,
  CT1
} from '@makerdao/dai-plugin-mcd';
// import { createCurrency } from '@makerdao/currency';

export default [
  {
    slug: 'ct1-a', // URL param
    symbol: 'CT1-A', // how it's displayed in the UI
    key: 'CT1-A', // the actual ilk name used in the vat
    gem: 'CT1', // the actual asset that's being locked
    currency: CT1, // the associated dai.js currency type
    networks: ['kovan', 'mainnet', 'testnet', 'rinkeby', 'ropsten', 'goerli']
  },
  // {
  //   slug: 'omg-a', // URL param
  //   symbol: 'OMG-A', // how it's displayed in the UI
  //   key: 'OMG-A', // the actual ilk name used in the vat
  //   gem: 'OMG', // the actual asset that's being locked
  //   currency: OMG, // the associated dai.js currency type
  //   networks: ['kovan', 'mainnet', 'testnet', 'rinkeby', 'ropsten', 'goerli']
  // },
  // {
  //   slug: 'eth-a', // URL param
  //   symbol: 'ETH-A', // how it's displayed in the UI
  //   key: 'ETH-A', // the actual ilk name used in the vat
  //   gem: 'ETH', // the actual asset that's being locked
  //   currency: ETH, // the associated dai.js currency type
  //   networks: ['kovan', 'mainnet', 'testnet', 'rinkeby', 'ropsten', 'goerli']
  // },
  // {
  //   slug: 'bat-a',
  //   symbol: 'BAT-A',
  //   key: 'BAT-A',
  //   gem: 'BAT',
  //   currency: BAT,
  //   networks: ['kovan', 'mainnet', 'testnet', 'rinkeby', 'ropsten', 'goerli']
  // },
  // {
  //   slug: 'usdc-a',
  //   symbol: 'USDC-A',
  //   key: 'USDC-A',
  //   gem: 'USDC',
  //   currency: USDC,
  //   networks: ['kovan', 'mainnet', 'testnet', 'rinkeby', 'ropsten', 'goerli'],
  //   decimals: 6
  // },
  // {
  //   slug: 'usdc-b',
  //   symbol: 'USDC-B',
  //   key: 'USDC-B',
  //   gem: 'USDC',
  //   currency: USDC,
  //   networks: ['kovan', 'mainnet'],
  //   decimals: 6
  // },
  // {
  //   slug: 'wbtc-a',
  //   symbol: 'WBTC-A',
  //   key: 'WBTC-A',
  //   gem: 'WBTC',
  //   currency: WBTC,
  //   networks: ['kovan', 'mainnet'],
  //   decimals: 8
  // },
  // {
  //   slug: 'tusd-a',
  //   symbol: 'TUSD-A',
  //   key: 'TUSD-A',
  //   gem: 'TUSD',
  //   currency: TUSD,
  //   networks: ['kovan', 'mainnet']
  // },
  // {
  //   slug: 'knc-a',
  //   symbol: 'KNC-A',
  //   key: 'KNC-A',
  //   gem: 'KNC',
  //   currency: KNC,
  //   networks: ['mainnet', 'kovan']
  // },
  // {
  //   slug: 'zrx-a',
  //   symbol: 'ZRX-A',
  //   key: 'ZRX-A',
  //   gem: 'ZRX',
  //   currency: ZRX,
  //   networks: ['mainnet', 'kovan']
  // },
  {
    slug: 'mana-a',
    symbol: 'MANA-A',
    key: 'MANA-A',
    gem: 'MANA',
    currency: MANA,
    networks: ['mainnet', 'kovan']
  }
];
