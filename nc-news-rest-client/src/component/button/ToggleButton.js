import React, { Component } from 'react';
import { Button } from '@material-ui/core';

class ToggleButton extends Component {
 state = {
  onLeft: true
 }
 handleClick = (item) => {
  item === this.props.left
   ? this.setState({
    onLeft: true
   })
   : this.setState({
    onLeft: false
   })
  this.props.onClick(item)
 }
 render() {
  const { left, right } = this.props;
  const { onLeft } = this.state;
  return (
   <div>
    <Button variant={onLeft ? "contained" : "outlined"} size="small" color="primary"
     onClick={() => this.handleClick(left)}> {left} </Button>
    <Button variant={onLeft ? "outlined" : "contained"} size="small" color="primary"
     onClick={() => this.handleClick(right)}> {right}</Button>
   </div>
  );
 }
};

export default ToggleButton;