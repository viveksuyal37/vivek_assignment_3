import React, { useState } from "react";
import LoaderContext from "./LoaderContext";

const LoaderState = (props) => {
  const LoadingState = useState(false);
  return (
    <LoaderContext.Provider value={LoadingState}>
      {props.children}
    </LoaderContext.Provider>
  );
};

export default LoaderState;
