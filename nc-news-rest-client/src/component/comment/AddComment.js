import React, { Component } from 'react';
import { addComment } from '../api';
import { GET_ARTICLE } from '../../constant/Query';
import { Button, TextField } from '@material-ui/core';
import Style from './AddComment.module.css';

class AddComment extends Component {
 state = {
  text: ''
 };
 onChange = ({ target }) => {
  const { value } = target;
  this.setState({
   ...this.state,
   body: value
  })
 }
 handleChange = ({ target }) => {
  const { value } = target;
  this.setState({
   ...this.state,
   author: value
  })
 }

 handleSubmit = (e, createComment) => {
  const { author, body } = this.state;
  const { id } = this.props;
  e.preventDefault();
  createComment({ variables: { username: author, id, comment: body } });
  this.setState({ ...INITIAL_STATE })
 }
 render() {
  const { author, body } = this.state;
  const { id } = this.props;
  return (
   <Mutation mutation={ADD_COMMENT}
    // refetchQueries={[{
    //   query: GET_ARTICLE
    //   , variables: { id }
    // }]}
    //Update returned data from server!!
    update={(cache, { data: { createComment } }) => {
     const { getArticle } = cache.readQuery({ query: GET_ARTICLE, variables: { id } });
     const { comments, comment_count } = getArticle;
     const newCount = comment_count + 1;
     const newComments = [createComment, ...comments]
     cache.writeQuery({
      query: GET_ARTICLE,
      variables: { id },
      data: { getArticle: { ...getArticle, comment_count: newCount, comments: newComments } }
     })
    }}
   >
    {(createComment, { data, loading, error }) => {
     if (loading) return "Loading...";
     if (error) return `Error! ${error.message}`;
     return (
      <div className={Style.outline}>
       <h4>Please provide a valid username to post a comment to this article</h4>
       <form onSubmit={(e) => this.handleSubmit(e, createComment)} >
        <div className={Style.form}>
         <div className={Style.username}>
          <Select value={author} autoWidth={true} onChange={this.handleChange}
          >
           <MenuItem value="jessjelly">jessjelly</MenuItem>
           <MenuItem value="tickle122">tickle122</MenuItem>
           <MenuItem value="grumpy19">grumpy19</MenuItem>
           <MenuItem value="happyamy2016">happyamy2016</MenuItem>
           <MenuItem value="cooljmessy">cooljmessy</MenuItem>
           <MenuItem value="weegembump">weegembump</MenuItem>
          </Select>
         </div>
         <div className={Style.body}>
          <TextField label='comment' value={body} onChange={this.onChange} margin='none' fullWidth />
         </div>
         <div className={Style.submit}>
          <Button type="submit" variant="contained" size="medium" color="primary" disabled={!(author && body)}> Submit </Button>
         </div>
        </div>
       </form>
      </div>
     )
    }}
   </Mutation>
  );
 }
};

export default AddComment;