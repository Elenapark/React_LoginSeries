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
- call refresh api once when previously given access token expires, but redirect to login page when even refresh token expires

## React Persistent User Login Authentication with JWT Tokens

- user loses their status (access token) when refresh because app stores access token only in memory
- but it's strongly recommended not to store access token in the local storage where someone else can grab it with JS
- thanks to persistent login, app will maintain user's access status regardless of refresh, but it's not secure either.
- if security of app is essential, we live with having to log back in on every refresh.
- when user forget to sign out in public, user can be exposed to hacking.
- to solve this security issue, make checkbox for user to check whethey they trust device or not.
- fix memory leak when trying to set state to an unmounted component
