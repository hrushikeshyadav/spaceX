import moment from 'moment';

export const formatDate = (datetime) => {
  return moment(datetime).format('DD/MM/YYYY hh:mm A');
};
