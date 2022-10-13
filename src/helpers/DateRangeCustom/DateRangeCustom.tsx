import * as React from 'react';
import DatePicker from 'react-datepicker';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import { getYear, getMonth } from 'date-fns';
import range from 'lodash/range';
import clsx from 'clsx';
import { Portal } from 'react-overlays';

import 'react-datepicker/dist/react-datepicker.css';
import styles from './DateRangeCustom.module.scss';
import { useSelector } from 'react-redux';
import { statusRemoveDateRange } from '@/store/selectors';

export function DateRangeCustom(props: any) {
  const [dateRange, setDateRange] = React.useState([null, null]);
  const [startDate, endDate] = dateRange;
  const years = range(1990, getYear(new Date()) + 1, 1);
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const isRemoveDateRangeSelectors = useSelector(statusRemoveDateRange);

  React.useEffect(() => {
    if (isRemoveDateRangeSelectors) {
      setDateRange([null, null]);
    }
  }, [isRemoveDateRangeSelectors]);

  const CustomInput = React.forwardRef(({ value, onClick, onChange }: any, ref: any) => (
    <TextField
      id="outlined-basic"
      label="Issue Date Range"
      variant="outlined"
      name={props.name}
      value={value}
      fullWidth
      onClick={onClick}
      ref={ref}
      onChange={onChange}
    />
  ));

  const handleChange = (event: any) => {
    setDateRange(event);
  };

  const CalendarContainer = ({ children }: any) => {
    const el = document.getElementById('calendar-portal');
    return <Portal container={el}>{children}</Portal>;
  };

  const handleCalendarClose = () => {
    props.onChange(dateRange);
    props.onCalendarClose();
  };

  return (
    <>
      <FormControl className="w-100">
        <DatePicker
          dateFormat="yyyy/MM/dd"
          selectsRange={true}
          startDate={startDate}
          endDate={endDate}
          onChange={handleChange}
          onCalendarClose={handleCalendarClose}
          customInput={<CustomInput />}
          name={props.name}
          value={props.value}
          popperContainer={CalendarContainer}
          renderCustomHeader={({
            date,
            changeYear,
            changeMonth,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div
              style={{
                margin: 10,
                display: 'flex',
                justifyContent: 'space-between',
              }}
            >
              <button
                className={clsx(styles.buttonArrow)}
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
              >
                {'<'}
              </button>
              <select
                value={getYear(date)}
                onChange={({ target: { value } }) => changeYear(+value)}
              >
                {years.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              <select
                value={months[getMonth(date)]}
                onChange={({ target: { value } }) => changeMonth(months.indexOf(value))}
              >
                {months.map(option => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button
                className={clsx(styles.buttonArrow)}
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
              >
                {'>'}
              </button>
            </div>
          )}
        />
      </FormControl>
    </>
  );
}
