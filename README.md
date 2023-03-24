# recoil 샘플코드 (카운터 구현)

- recoil > react 상태관리 라이브러리
- App.js에서 확인가능.

## 결론부터

- 러닝커브가 낮아 빠르게 익힐 수 있고 가볍게 사용하기 좋다.
- 리액트의 useState와 비슷한 문법으로 인해 적용 쉽다.
- suspense나 에러 바운더리, 동시성 모드를 지원한다.
- 캐싱을 지원해 성능 개선에 도움된다.
- redux와는 다르게 미들웨어없이 쉽게 비동기 로직이 구현된다.
- 하지만 devtools의 부재로 인해 큰 규모의 프로젝트에 도입하긴 부담스럽다.

## 컨셉

#### atoms

Recoil에서 상태의 기본 단위입니다. 읽거나 업데이트할 수 있는 상태를 나타냅니다. 아톰을 생성하려면 atom 함수를 사용하고 고유 키와 기본값을 제공합니다.

```
import { atom } from 'recoil';

const counterState = atom({
  key: 'counterState',
  default: 0,
});
```

#### selector

선택자는 다른 아톰이나 선택자의 값을 읽고 이들로부터 새로운 값을 도출할 수 있는 순수 함수입니다. 응용 프로그램의 상태(원자)를 기반으로 파생된 상태를 계산하는 데 사용됩니다.

```
import { selector } from 'recoil';

const counterDisplay = selector({
  key: 'counterDisplay',
  get: ({ get }) => {
    const count = get(counterState);
    return `Current Count: ${count}`;
  },
});
```

#### RecoilRoot

RecoilRoot는 애플리케이션 구성 요소 트리의 루트에 추가해야 하는 React 구성 요소입니다. Recoil이 상태를 관리하는 데 필요한 컨텍스트를 제공합니다.

```
import { RecoilRoot } from 'recoil';

function App() {
  return (
    <RecoilRoot>
      {/* Your application components */}
    </RecoilRoot>
  );
}
```

#### Hooks

Recoil은 구성 요소의 원자 및 선택기와 상호 작용할 수 있는 몇 가지 후크를 제공합니다.

- useRecoilState: 이 훅은 아톰 또는 셀렉터의 현재 값이 있는 튜플과 아톰 값을 업데이트하는 setter 함수를 반환합니다. 이는 React의 useState 후크와 유사하게 작동합니다.

```
import { useRecoilState } from 'recoil';

function Counter() {
  const [count, setCount] = useRecoilState(counterState);

  // ...
}
```

- useRecoilValue: 이 후크는 원자 또는 선택기의 현재 값을 반환합니다. 값을 업데이트하지 않고 읽기만 하면 되는 경우에 사용해야 합니다.

```
import { useRecoilValue } from 'recoil';

function CounterDisplay() {
  const countDisplay = useRecoilValue(counterDisplay);

  // ...
}
```

- useSetRecoilState: 이 후크는 아톰 값을 업데이트하는 setter 함수를 반환합니다. 값을 읽지 않고 업데이트만 하면 되는 경우에 사용해야 합니다.

```
import { useSetRecoilState } from 'recoil';

function IncrementButton() {
  const setCount = useSetRecoilState(counterState);

  // ...
}
```

- useResetRecoilState: 이 후크는 아톰 값을 기본값으로 재설정하는 함수를 반환합니다.

```
import { useResetRecoilState } from 'recoil';

function ResetButton() {
  const resetCount = useResetRecoilState(counterState);

  // ...
}
```
