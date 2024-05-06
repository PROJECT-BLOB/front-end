import classNames from 'classnames/bind';

import { useTabStore } from '@stores/useTabStore';

import TabItem from './TabItem';
import styles from './TabList.module.scss';

const MYPAGE_TABS = [
  { label: 'MyPosts', value: '내가 쓴 글' },
  { label: 'Bookmarks', value: '저장한 글' },
  { label: 'MyComments', value: '댓글 단 글' },
];
const cx = classNames.bind(styles);

export default function TabList() {
  if (!MYPAGE_TABS.length) {
    return null;
  }

  const { selectedTab, setSelectedTab } = useTabStore();

  const handleClickTab = (value: string) => {
    setSelectedTab(value);
    console.log('clicked: ', value);
  };

  return (
    <div className={cx('tabs')}>
      {MYPAGE_TABS.map((tab) => (
        <TabItem key={tab.label} value={tab.value} isFocused={selectedTab === tab.value} onClick={handleClickTab} />
      ))}
    </div>
  );
}
