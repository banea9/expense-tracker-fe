export const getFormattedDate = (date) => {
  const convertedDate = new Date(date);
  const isoStringDateArr = convertedDate.toISOString().substring(0, 10).split('-')
  return `${isoStringDateArr[2]}.${isoStringDateArr[1]}.${isoStringDateArr[0]}`;
};

export const getDateMinusDays = (date, days) => {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate() - days);
};
