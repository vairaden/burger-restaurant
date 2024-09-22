import { WebsocketConfigType } from './types';

export const API_URL = 'https://norma.nomoreparties.space/api';

export const enum WebsocketConfig {
  ORDERS_ALL = 'orders_personal',
  ORDERS_PERSONAL = 'orders_all',
}

export const websocketConfigs: Record<WebsocketConfig, WebsocketConfigType> = {
  [WebsocketConfig.ORDERS_ALL]: {
    url: 'wss://norma.nomoreparties.space/orders/all',
    needAuth: false,
  },
  [WebsocketConfig.ORDERS_PERSONAL]: {
    url: 'wss://norma.nomoreparties.space/orders',
    needAuth: true,
  },
};
