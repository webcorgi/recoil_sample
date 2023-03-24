import React from 'react';
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue } from 'recoil';

// Atoms
const counterState = atom({
  key: 'counterState',
  default: 0,
});

// Selectors
const counterDisplay = selector({
  key: 'counterDisplay',
  get: ({ get }) => {
    const count = get(counterState);
    return `Current Count: ${count}`;
  },
});

// Components
function Counter() {
  const [count, setCount] = useRecoilState(counterState);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);

  return (
    <div>
      <button onClick={decrement}>-</button>
      <span>{count}</span>
      <button onClick={increment}>+</button>
    </div>
  );
}

function CounterDisplay() {
  const countDisplay = useRecoilValue(counterDisplay);

  return <div>{countDisplay}</div>;
}

function App() {
  return (
    <RecoilRoot>
      <Counter />
      <CounterDisplay />
    </RecoilRoot>
  );
}

export default App;