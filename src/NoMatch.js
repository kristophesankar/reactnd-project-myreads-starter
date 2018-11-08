import React from "react";

//this the 404 page for incorrect urls
const NoMatch = ({ location }) => {
  return <h1>Sorry <code>{location.pathname}</code> cannot be found on this server.</h1>;
}

export default NoMatch;