import React from 'react';
import { Select, MenuItem } from '@material-ui/core';

const SortSelect = ({ onChange, sortValue, addings }) => {
 return (
  <div className="sort">
   <label>SORT BY:</label>
   <Select value={sortValue} autoWidth={true} onChange={onChange}
   >
    <MenuItem value="date">date</MenuItem>
    <MenuItem value="votes">votes</MenuItem>
    <MenuItem value="author">author</MenuItem>
    {addings && addings.map(adding => <MenuItem key={adding} value={adding}>{adding}</MenuItem>)}
   </Select>
  </div>
 );
};

const WithCommentCount = SelectBase => props => <SelectBase {...props} addings={["comments"]} />;

export const SortSelectWithCommentCount = WithCommentCount(SortSelect);

export default SortSelect;
