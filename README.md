# A React Northcoders-News Client

This App web is hosted on [Netlify](https://tao-nc-news-rest-client.netlify.com/). The server app is hosted on [Heroku](https://nc-news-rest-api.herokuapp.com/) and the source code can be found on [Github](https://github.com/taodtu/nc-news)

I have also made a similar App but with a different tech stack: GraphQL as the data layer. The source code for this project is largely different. Here you can find the App [web](https://tao-apollo-graphql-nc-news-client.netlify.com/) and [source code](https://github.com/taodtu/react-apollo-graphql-ncnews-client), and the server app [web](https://nc-news-graphql-server.herokuapp.com/) and [source code](https://github.com/taodtu/nc-news-react-graphql-client)

Northcoders News is a social news aggregation, web content rating, and discussion website. Northcoders News has articles which are divided into topics. Each article has user curated ratings and can be up or down voted using the API. Users can also add comments about an article. Comments can also be up or down voted. A user can add comments and remove any comments (comment can only be deleted by its author, so please select the correct current user to delete a comment) which they have added.

## Features

- All the data manipulations on array and object are ensured **`not mutating`** the original data by using destructuring and spread operator. In addtional to fullfilling the northcoder project requirement, an UserPage is created for more advanced functionality.

- Maximize **`component reuse`**, such as the voting button, toggle-button, article list,comment-list, sort-select and handler functions.

- Applying **`Render Props`** pattern to reuse the CommentList in both Article and User Page, where a AddComment is deployed inside of Article page which needs access to CommentList method. 

- Applying **`slot pattern`** and **`ContextAPI`** to avoid props drilling.

- Adopting **`Higher Order Component (HOC)`** pattern to wrap CommentList with **`Context.Consumer`** in both ArticlePage and UserPage for enhanced reusable component.

- Use **`React Hooks`** to animate the title color change when mouse hove over it (click the title in mobile device).

- Implement **`optimistic response`** for the vote button.

- Page-number style **`pagination`** implemented.

- React 16 with create-react-app.

- Responsive.

- Styling with [@material/ui v4.1.3](https://material-ui.com/).

- Routing with [@reach/router v1.1.0](https://reach.tech/router).

- Fallback image handled with [react-image v2.1.3](https://www.npmjs.com/package/react-image).

- Add loading spinner with [react-loader-spinner v2.30](https://www.npmjs.com/package/react-loader-spinner)

## Installation
- git clone https://github.com/taodtu/nc-news-rest-client.git
- cd nc-news-rest-client/nc-news-rest-client.
- npm install.
- npm start.
- visit http://localhost:3000



