// export const authenticate = (response, next) => {
//   if (window != "undefined") {
//     sessionStorage.setItem("token", JSON.stringify(response.data.token));
//     sessionStorage.setItem("username", JSON.stringify(response.data.username));
//   }
//   next();
// };

//token
export const getToken = () => {
  if (window != "undefined") {
    if (sessionStorage.getItem("token")) {
      return JSON.parse(sessionStorage.getItem("token"));
    } else {
      return false;
    }
  }
};
