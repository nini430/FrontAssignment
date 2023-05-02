import { useEffect } from 'react';
import { Pie } from '@ant-design/plots';
import { useUserStore } from '../store/users';

const PieChart = () => {
  const { statistics, getUserStatistics } = useUserStore();
  useEffect(() => {
    getUserStatistics();
  }, [getUserStatistics]);
  const config = {
    appendPadding: 10,
    data: statistics || [],
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
};

export default PieChart;
