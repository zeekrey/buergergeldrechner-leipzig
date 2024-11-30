import "./App.css";

import { useRef } from "react";
import { useScrollSpy } from "./lib";

function App() {
  const steps: {
    name: string;
    color: string;
    ref: React.RefObject<HTMLElement>;
  }[] = [
    { name: "Step #1", color: "grey", ref: useRef(null) },
    { name: "Step #2", color: "blue", ref: useRef(null) },
    { name: "Step #3", color: "red", ref: useRef(null) },
    { name: "Step #4", color: "green", ref: useRef(null) },
    { name: "Step #5", color: "black", ref: useRef(null) },
  ];

  const activeStep = useScrollSpy(
    steps.map((step) => ({ name: step.name, ref: step.ref }))
  );

  return (
    <main>
      {steps.map(({ name, color, ref }) => (
        <section key={name} style={{ background: color }} ref={ref}>
          {name}
        </section>
      ))}
      <aside>{activeStep}</aside>
    </main>
  );
}

export default App;
