import React, { Suspense } from "react";

// ** Router Import
import Router from "./router/Router";
import "./App.css";

const App = () => {
  return (
    <Suspense fallback={null}>
      <Router />
    </Suspense>
  );
};

export default App;
