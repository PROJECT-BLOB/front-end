import classNames from 'classnames/bind';

import Checkbox from '@components/Checkbox/Checkbox';

import styles from './CheckboxList.module.scss';

const cx = classNames.bind(styles);

interface CheckboxListProps {
  checkBox: { hasImage: boolean; hasLocation: boolean };
  setCheckBox: React.Dispatch<
    React.SetStateAction<{
      hasImage: boolean;
      hasLocation: boolean;
    }>
  >;
}

export default function CheckboxList({ checkBox, setCheckBox }: CheckboxListProps) {
  const handleCheckImage = () => {
    setCheckBox((prev) => ({ ...prev, hasImage: !checkBox.hasImage }));
  };

  const handleCheckLocation = () => {
    setCheckBox((prev) => ({ ...prev, hasLocation: !checkBox.hasLocation }));
  };

  return (
    <section className={cx('checkbox-list')}>
      <h2 className={cx('sub-title')}>추가 옵션</h2>
      <Checkbox value='' checkedItemHandler={handleCheckImage}>
        이미지가 있는 게시글만 모아보기
      </Checkbox>
      <Checkbox value='' checkedItemHandler={handleCheckLocation}>
        상세위치가 있는 게시글만 모아보기
      </Checkbox>
    </section>
  );
}
