import moment from "moment";
import "moment/locale/vi";
moment.locale("vi");

export const formatPrice = (price) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
const mapObj={
  sa:"Sáng",
  ch:"Chiều"
}
export const convertDatetime = (datetime) => {
  return moment(datetime).format('Do MMMM YYYY, h:mm:ss a').replace(/\b(?:sa|ch)\b/gi, matched => mapObj[matched]);
};
