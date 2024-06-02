import { ConfigProvider, DatePicker, Space } from 'antd';
import ko_KR from 'antd/lib/locale/ko_KR';
import classNames from 'classnames/bind';

import styles from './FilterDate.module.scss';

const { RangePicker } = DatePicker;

const cx = classNames.bind(styles);

interface FilterDateProps {
  setDate: (date: { startDate: string | undefined; endDate: string | undefined }) => void;
}

export default function FilterDate({ setDate }: FilterDateProps) {
  return (
    <section className={cx('date-box')}>
      <h2 className={cx('sub-title')}>날짜 선택</h2>
      <ConfigProvider locale={ko_KR}>
        <Space direction='vertical'>
          <RangePicker
            popupClassName={styles.dateRangePicker}
            placeholder={['시작날짜', '종료날짜']}
            onChange={(dates) => {
              if (dates) {
                setDate({ startDate: dates[0]?.format('YYYY-MM-DD'), endDate: dates[1]?.format('YYYY-MM-DD') });
              }
            }}
          />
        </Space>
      </ConfigProvider>
    </section>
  );
}
