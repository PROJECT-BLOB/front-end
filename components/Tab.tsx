import { PropsWithChildren } from 'react';

import styles from './Tab.module.scss';

interface TabProps {
  focused: boolean;
}

export default function Tab({ children, focused }: PropsWithChildren<TabProps>) {
  return <span className={`${styles.tab} ${focused && styles.focused}`}>{children}</span>;
}
