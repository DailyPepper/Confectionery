export const data = {
  labels: [
    'Ошибка ПО',
    'Сбой в электропитании',
    'Поломка конвейера',
    'Перегрев двигателя'
  ],
  datasets: [
    {
      label: 'Данные',
      backgroundColor: 'brown',
      data: [10, 20, 12, 39],
    },
  ],
};

export const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
  },
};