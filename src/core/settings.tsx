import * as React from 'react';
import { useContext } from 'react';
import ErxesIcon, { IconProps } from '../components/MaterialCommunityIcons';

export type Settings = {
  icon: ({ name, color, size, direction }: IconProps) => React.ReactNode;
  apiUrl: string;
};

export const SettingsContext = React.createContext<Settings>({
  icon: ErxesIcon,
  apiUrl: 'office.erxes.io/gateway',
});

export const { Provider, Consumer } = SettingsContext;

export function useSettings() {
  const mContext = useContext(SettingsContext);
  return mContext;
}
