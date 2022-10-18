# React Login Series

## React JS Form Validation and Axios User Registration Form Submit

- make registration form with custom validation
- connect register api with nodejs backend
- register error handling depending on BE responses

## React User Login and Authentication with Axios

- make login form
- connect auth api with nodejs backend
- control auth state using Context API (accessToken,roles,user,pwd getting from BE responses)
- auth error handling depending on BE responses

## React Protected Routes | Role-Based Auth | React Router V6

- Role Based User Permission (User,Admin,Editor..) for protected routes with React Router Dom V6

## React Login Authentication with JWT Access T, Refresh T, Cookies and Axios

- use AbortController API when react component unmounts for canceling asynchronous api request that is no more necessary or called by mistake
- withCredentials property in axios api request allows us to send cookies with our request
- generate axios instance for making private api calls that needs authorization using axios interceptors
  - attach JWT tokens with request
  - retry once when 403 forbidden error returns due to expiration of previously given access token
  - clean up(eject) axios interceptors when unmounts otherwise they can pile on
