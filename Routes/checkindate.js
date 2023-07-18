import moment from 'moment'

function getBookingDates(checkinDate, checkoutDate) {
  const dates = [];
  const checkinDateObj = moment(checkinDate);
  const checkoutDateObj = moment(checkoutDate);
  while (checkinDateObj <= checkoutDateObj) {
    dates.push(checkinDateObj.format('YYYY-MM-DD'));
    checkinDateObj.add(1, 'days');
  }
  return dates;
}

export default getBookingDates;