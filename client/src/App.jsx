import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(
      () =>
        setCount(
          // We avoid reaching outside of scope to `count`.
          // In this way, we avoid potential bugs 🐛s.
          // These could occur from using stale state from function closures by the time the timeout is triggered.
          //           use a functional way to update count state - (https://dmitripavlutin.com/react-usestate-hook-guide/#42-stale-state)
          (prevCount) => prevCount + 1
        ),
      1000
    );

    // We cleanup in between re-renders to avoid memory leaks.
    return () => {
      clearTimeout(timeout);
    };
  });
  return (
    <main>
      <header>
        <p>Page has been open for {count} seconds.</p>
      </header>
    </main>
  );
}

export default App;
