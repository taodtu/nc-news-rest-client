import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

const SortSelect = ({ onChange, sortValue, adding }) => {
 return (
  <div className="sort">
   <label>SORT BY:</label>
   <Select value={sortValue} autoWidth={true} onChange={onChange}
   >
    <MenuItem value="date">date</MenuItem>
    <MenuItem value="id">id</MenuItem>
    <MenuItem value="votes">votes</MenuItem>
    <MenuItem value="author">author</MenuItem>
    {adding && <MenuItem value={adding}>{adding}</MenuItem>}
   </Select>
  </div>
 );
};

const WithCommentCount = SelectBase => props => <SelectBase {...props} adding={"comments"} />;

export const SortSelectWithCommentCount = WithCommentCount(SortSelect);

export default SortSelect;
