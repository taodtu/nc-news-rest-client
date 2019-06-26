import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

const LimitSelect = ({ onChange, limit }) => {
 let list = [];
 for (let i = 1; i <= 12; i++) {
  list = [...list, i]
 }
 return (
  <div className="sort">
   <label>Show how many articles per page:</label>
   <Select value={limit} autoWidth={true} onChange={onChange}
   >
    {list.map(num => <MenuItem key={num} value={num}
    > {num}</MenuItem>)}

   </Select>
  </div>
 );
};

export default LimitSelect;