import * as React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';

import { debounce } from 'lodash';

// import styles from './SelectCustom.module.scss';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function SelectCustom(props: any) {
  const propData = props?.data;
  const propValue = props?.value;

  const [filteredNames, setfilteredNames] = React.useState<any[]>([]);
  const [textFilter, setTextFilter] = React.useState<string>('');

  React.useEffect(() => {
    setfilteredNames(propData);
  }, [propData]);

  const setDisplayed = debounce((query: any) => {
    const namesFiltered = propData.filter((item: any) => item.name.toLowerCase().includes(query));
    setfilteredNames(namesFiltered);
  }, 300);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value.toLowerCase();
    setTextFilter(event.target.value);
    setDisplayed(input);
  };

  const stopImmediatePropagation = (e: any) => {
    e.stopPropagation();
    e.preventDefault();
  };

  const handleClose = () => {
    if (textFilter !== '') {
      setTextFilter('');
      setfilteredNames(propData);
    }
  };

  const handleClick = (e: any) => {
    props.onClick();
  };

  const handleClickItem = (item: any, name: string, tagName: string) => {
    props.onClickItem({ name, item, tagName });
  };

  return (
    <>
      <FormControl className="w-100">
        <InputLabel id="demo-multiple-checkbox-label">{props.tagName}</InputLabel>
        <Select
          labelId="demo-multiple-checkbox-label"
          name={props.name}
          multiple
          value={propValue}
          onChange={props.onChangeValue}
          input={<OutlinedInput label={props.tagName} />}
          renderValue={selected => selected.length + ' items selected'}
          MenuProps={MenuProps}
          onClose={handleClose}
          onClick={handleClick}
        >
          <TextField
            className="py-2 px-3"
            id="outlined-basic"
            placeholder="Search..."
            variant="standard"
            value={textFilter}
            onChange={handleInputChange}
            onKeyDown={e => e.stopPropagation()}
            onClickCapture={stopImmediatePropagation}
            fullWidth
          />

          {filteredNames?.map(item => (
            <MenuItem
              key={item?.id}
              value={item?.id}
              onKeyDown={e => e.stopPropagation()}
              onClick={() => handleClickItem(item, props.name, props.tagName)}
            >
              <Checkbox checked={propValue.indexOf(item?.id) > -1} />
              <ListItemText primary={item?.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
}

export default React.memo(SelectCustom);
