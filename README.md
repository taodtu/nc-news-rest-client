# A React Northcoders-News Client

This App is hosted on [here](https://tao-nc-news-rest-client.netlify.com/) and the server app is hosted on [Github](https://github.com/taodtu/nc-news)

Northcoders News is a social news aggregation, web content rating, and discussion website. Northcoders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments which they have added.

## Features

- All the data manipulations on array and object are ensured **`not mutating`** the original data by using destructuring and spread operator. In addtional to fullfill the northcoder project requirement, an UserPage is created for more advanced functionality.

- Maximize **`component reuse`**, such as the voting button, toggle-button, article list, sort-select.

- Applying **`Render Props`** pattern to reuse the CommentList in both Article and User Page, where a AddComment is deployed inside of Article page which needs access to CommentList method. 

- Adopting **`Higher Order Component (HOC)`** pattern in SortSelect component to make it reusable with added properties in ArticleList and CommentList component.

- Implement **`optimistic response`** for the vote button.

- Applying **`slot pattern`** to avoid props drilling.

- Page-number style **`pagination`** implemented.

- React 16 with create-react-app.

- Responsive.

- Styling with [@material/ui v4.1.3](https://material-ui.com/).

- Routing with [@reach/router v1.1.0](https://reach.tech/router).



