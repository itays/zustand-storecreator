import { useState } from "react";
import BearCounter from "./BearCounter";

export default function App() {
  const [count, setCount] = useState(0);
  console.log("App is rendered");

  return (
    <>
      <button onClick={() => setCount(count + 1)}>App counter: {count}</button>
      <hr />
      <BearCounter initialCount={0} name="Bear Counter 1" />
      <hr />
      <BearCounter initialCount={1} name="Bear Counter 2" />
    </>
  );
}
