## Features

All the data manipulations on array and object are ensured **`not mutating`** the original data by using destructuring and spread operator. In addtional to fullfill the northcoder project requirement, an UserPage is created for more advanced functionality.

Maximize **`component reuse`**, such as the voting button, toggle-button, article list, sort-select.

Applying **`Render Props`** pattern to reuse the CommentList in both Article and User Page, where a AddComment is deployed inside of Article page which needs access to CommentList method. 

Adopting **`Higher Order Component (HOC)`** pattern in SortSelect component to make it reusable with added properties in ArticleList and CommentList component.

Implement **`optimistic response`** for the vote button.

Applying **`slot pattern`** to avoid props drilling.

Page-number style **`pagination`** implemented.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

