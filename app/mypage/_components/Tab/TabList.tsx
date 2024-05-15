import classNames from 'classnames/bind';

import { useTabStore } from '@stores/useTabStore';

import TabItem from './TabItem';
import styles from './TabList.module.scss';

const MYPAGE_TABS = [
  { label: 'MyPosts', value: '작성한 글' },
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
    const selectedTabLabel = MYPAGE_TABS.find((tab) => tab.value === value)?.label || ''; // 해당 value에 대응하는 label 찾기
    setSelectedTab(selectedTabLabel);
    console.log('clicked: ', selectedTabLabel);
  };

  return (
    <div className={cx('tabs')}>
      {MYPAGE_TABS.map((tab) => (
        <TabItem key={tab.label} value={tab.value} isFocused={selectedTab === tab.label} onClick={handleClickTab} />
      ))}
    </div>
  );
}
