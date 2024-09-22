import { WebsocketConfig } from './types';

export const API_URL = 'https://norma.nomoreparties.space/api';

export const enum WebsocketConfigTypes {
  ORDERS_ALL = 'orders_personal',
  ORDERS_PERSONAL = 'orders_all',
}

export const websocketConfigs: Record<WebsocketConfigTypes, WebsocketConfig> = {
  [WebsocketConfigTypes.ORDERS_ALL]: {
    url: 'wss://norma.nomoreparties.space/orders/all',
  },
  [WebsocketConfigTypes.ORDERS_PERSONAL]: {
    url: 'wss://norma.nomoreparties.space/orders',
  },
};
