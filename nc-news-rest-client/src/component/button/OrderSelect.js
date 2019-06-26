import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

const OderSelect = ({ onChange, orderValue }) => {
 return (
  <div className="sort">
   <label>Order:</label>
   <Select value={orderValue} autoWidth={true} onChange={onChange}
   >
    <MenuItem value="desc">desc</MenuItem>
    <MenuItem value="asc">asc</MenuItem>
   </Select>
  </div>
 );
};

export default OderSelect;