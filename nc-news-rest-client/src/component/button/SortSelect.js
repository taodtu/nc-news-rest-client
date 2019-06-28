import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

const SortSelect = ({ onChange, sortValue, options }) => {
 return (
  <div className="sort">
   <label>SORT BY:</label>
   <Select value={sortValue} autoWidth={true} onChange={onChange}>
    {options && options.map(adding => <MenuItem key={adding} value={adding}>{adding}</MenuItem>)}
   </Select>
  </div>
 );
};

export default SortSelect;
