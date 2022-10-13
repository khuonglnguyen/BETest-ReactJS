import moment from "moment";

export const formatDate = (value: Date | string, format: string) => {
  if(!value) return value;
  return moment(value).format(format);
};
