import React, { useCallback, useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Spin } from 'antd';
import cls from 'classnames';
import styles from './index.less';

const AgileChar = ({ data, loading, zoom, mode }) => {
  const [currentFilter, setCurrentFilter] = useState('month');
  const agileStyle = useCallback(
    (current) => cls(styles.customFilter_Item, { [styles.active]: current === currentFilter }),
    [currentFilter],
  );
  const handleChangeCurrentFilter = useCallback((filter) => {
    setCurrentFilter(filter);
  }, []);
  const convertDataToDataSet = useCallback(
    (datas) => {
      const labels = [];
      const chartData = [];
      datas?.price_filter_by_time[currentFilter].forEach((ds) => {
        switch (currentFilter) {
          case 'month':
            labels.push(ds?.month_str);
            break;
          case 'year':
            labels.push(ds?.year_str);
            break;
          default:
            break;
        }
        chartData.push(ds?.mean_ppm2);
      });
      return {
        labels,
        datasets: [
          {
            label: 'VNĐ (triệu/ m2) ',
            backgroundColor: 'rgba(0, 174, 172, 0.15)',
            data: [...chartData],
          },
        ],
      };
    },
    [data, currentFilter],
  );

  const MockDataSet = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'VNĐ (triệu/ m2)  ',
        strokeColor: 'rgba(0, 174, 172, 0.15);',
        pointColor: 'rgba(0, 174, 172, 0.15);',
        pointStrokeColor: 'rgba(0, 174, 172, 0.15)',
        pointHighlightFill: 'rgba(0, 174, 172, 0.15)',
        pointHighlightStroke: 'rgba(0, 174, 172, 0.15);',
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const options = {
    scales: {
      xAxes: [
        {
          stacked: true,
        },
      ],
    },
  };
  return (
    <>
      {zoom > 1 && (
        <Spin spinning={loading}>
          <div style={{ marginTop: '50px' }}>
            <h1 className={cls(styles.customH2, { [styles.customH2Detail]: mode === 'detail' })}>
              Biểu đồ giá bất động sản ở {data?.name || 'Hà nội'}
            </h1>
            <div className={cls('flex justify-end', styles.customFilter)}>
              <div
                className={agileStyle('month')}
                onClick={() => handleChangeCurrentFilter('month')}
              >
                <span>Tháng</span>
              </div>
              <div className={agileStyle('year')} onClick={() => handleChangeCurrentFilter('year')}>
                <span>Năm</span>
              </div>
            </div>
            <Line data={data ? convertDataToDataSet(data) : MockDataSet} options={options} />
          </div>
        </Spin>
      )}
    </>
  );
};

export default AgileChar;
