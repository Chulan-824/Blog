# 实现noop-renderer

到目前为止实现的模块：

- 核心模块：Reconciler
- 公用方法：React
- 浏览器宿主环境：ReactDOM

当前项目的问题：测试用例太单薄，无法照顾到项目的边界情况，但内容有限，无法覆盖所有用例

解决办法：构建成熟的React测试环境，实现测试工具，按需跑通用例

为了测试 Reconciler，我们需要构建`宿主环境无关的渲染器`，这就是 [react-noop-renderer](https://github.com/facebook/react/tree/main/packages/react-noop-renderer)

以下是使用 noop-renderer 的一个用例 packages/react-reconciler/src/__tests__/ReactEffectOrdering-test.js：

```jsx
/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @emails react-core
 * @jest-environment node
 */

/* eslint-disable no-func-assign */

'use strict';

let React;
let ReactNoop;
let Scheduler;
let act;
let useEffect;

describe('ReactHooksWithNoopRenderer', () => {
  beforeEach(() => {
    jest.resetModules();
    jest.useFakeTimers();

    React = require('react');
    act = require('jest-react').act;
    Scheduler = require('scheduler');
    ReactNoop = require('react-noop-renderer');

    useEffect = React.useEffect;
  });

  test('passive unmounts on deletion are fired in parent -> child order', async () => {
    const root = ReactNoop.createRoot();

    function Parent() {
      useEffect(() => {
        return () => Scheduler.unstable_yieldValue('Unmount parent');
      });
      return <Child />;
    }

    function Child() {
      useEffect(() => {
        return () => Scheduler.unstable_yieldValue('Unmount child');
      });
      return 'Child';
    }

    await act(async () => {
      root.render(<Parent />);
    });

    expect(root).toMatchRenderedOutput('Child');
    await act(async () => {
      root.render(null);
    });
    expect(Scheduler).toHaveYielded(['Unmount parent', 'Unmount child']);
  });
});
```

## Noop-Renderer 的实现

包括两部分：

- hostConfig
- 工厂函数（类似 ReactDOM）

在 ReactDOM 宿主环境的原生节点是 DOM 节点，在 Noop-Renderer 宿主环境包括三类节点：

- Instance（HostComponent）

```jsx
const instance = {
  id: instanceCounter++,
  type: type,
  children: [],
  parent: -1,
  props
};
```

- TextInstance（HostText）

```jsx
const textInstance = {
  text: content,
  id: instanceCounter++,
  parent: -1
};
```

- Container（HostRoot）

```jsx

const container = {
  rootID: idCounter++,
  children: []
};
```

对于如下组件：

```jsx
function App() {
  return (
    <>
      <Child />
      <div>hello world</div>
    </>
  );
}

function Child() {
  return 'Child';
}
```

经由 Noop-Renderer 渲染后得到的树状结构如下（对标 DOM树）：

```jsx
{
  "rootID": 0,
  "children": [
    {
      "text": "Child",
      "id": 0,
      "parent": 0
    },
    {
      "id": 2,
      "type": "div",
      "children": [
        {
          "text": "hello world",
          "id": 1,
          "parent": 2
        }
      ],
      "parent": 0,
      "props": {
        "children": "hello world"
      }
    }
  ]
}
```

除此以外，还需实现`以ReactElement的形式导出树状结构`


## 完善 Reconciler 测试环境

需要思考的问题：如何在并发环境测试运行结果？比如：

- 如何控制异步执行的时间？使用 [mock timer](https://jestjs.io/docs/timer-mocks)
- 如何记录并发情况下预期的执行顺序？

## 完善并发测试环境

安装并发的测试上下文环境：

```shell
pnpm i -D -w jest-react
```

安装matchers：
- reactTestMatchers.js
```shell
'use strict';

const JestReact = require('jest-react');
const SchedulerMatchers = require('./schedulerTestMatchers');

function captureAssertion(fn) {
  // Trick to use a Jest matcher inside another Jest matcher. `fn` contains an
  // assertion; if it throws, we capture the error and return it, so the stack
  // trace presented to the user points to the original assertion in the
  // test file.
  try {
    fn();
  } catch (error) {
    return {
      pass: false,
      message: () => error.message
    };
  }
  return { pass: true };
}

function assertYieldsWereCleared(Scheduler) {
  const actualYields = Scheduler.unstable_clearYields();
  if (actualYields.length !== 0) {
    throw new Error(
      'Log of yielded values is not empty. ' +
        'Call expect(Scheduler).toHaveYielded(...) first.'
    );
  }
}

function toMatchRenderedOutput(ReactNoop, expectedJSX) {
  if (typeof ReactNoop.getChildrenAsJSX === 'function') {
    const Scheduler = ReactNoop._Scheduler;
    assertYieldsWereCleared(Scheduler);
    return captureAssertion(() => {
      expect(ReactNoop.getChildrenAsJSX()).toEqual(expectedJSX);
    });
  }
  return JestReact.unstable_toMatchRenderedOutput(ReactNoop, expectedJSX);
}

module.exports = {
  ...SchedulerMatchers,
  toMatchRenderedOutput
};
```

- schedulerTestMatchers.js
```shell
'use strict';

function captureAssertion(fn) {
  // Trick to use a Jest matcher inside another Jest matcher. `fn` contains an
  // assertion; if it throws, we capture the error and return it, so the stack
  // trace presented to the user points to the original assertion in the
  // test file.
  try {
    fn();
  } catch (error) {
    return {
      pass: false,
      message: () => error.message
    };
  }
  return { pass: true };
}

function assertYieldsWereCleared(Scheduler) {
  const actualYields = Scheduler.unstable_clearYields();
  if (actualYields.length !== 0) {
    throw new Error(
      'Log of yielded values is not empty. ' +
        'Call expect(Scheduler).toHaveYielded(...) first.'
    );
  }
}

function toFlushAndYield(Scheduler, expectedYields) {
  assertYieldsWereCleared(Scheduler);
  Scheduler.unstable_flushAllWithoutAsserting();
  const actualYields = Scheduler.unstable_clearYields();
  return captureAssertion(() => {
    expect(actualYields).toEqual(expectedYields);
  });
}

function toFlushAndYieldThrough(Scheduler, expectedYields) {
  assertYieldsWereCleared(Scheduler);
  Scheduler.unstable_flushNumberOfYields(expectedYields.length);
  const actualYields = Scheduler.unstable_clearYields();
  return captureAssertion(() => {
    expect(actualYields).toEqual(expectedYields);
  });
}

function toFlushUntilNextPaint(Scheduler, expectedYields) {
  assertYieldsWereCleared(Scheduler);
  Scheduler.unstable_flushUntilNextPaint();
  const actualYields = Scheduler.unstable_clearYields();
  return captureAssertion(() => {
    expect(actualYields).toEqual(expectedYields);
  });
}

function toFlushWithoutYielding(Scheduler) {
  return toFlushAndYield(Scheduler, []);
}

function toFlushExpired(Scheduler, expectedYields) {
  assertYieldsWereCleared(Scheduler);
  Scheduler.unstable_flushExpired();
  const actualYields = Scheduler.unstable_clearYields();
  return captureAssertion(() => {
    expect(actualYields).toEqual(expectedYields);
  });
}

function toHaveYielded(Scheduler, expectedYields) {
  return captureAssertion(() => {
    const actualYields = Scheduler.unstable_clearYields();
    expect(actualYields).toEqual(expectedYields);
  });
}

function toFlushAndThrow(Scheduler, ...rest) {
  assertYieldsWereCleared(Scheduler);
  return captureAssertion(() => {
    expect(() => {
      Scheduler.unstable_flushAllWithoutAsserting();
    }).toThrow(...rest);
  });
}

module.exports = {
  toFlushAndYield,
  toFlushAndYieldThrough,
  toFlushUntilNextPaint,
  toFlushWithoutYielding,
  toFlushExpired,
  toHaveYielded,
  toFlushAndThrow
};
```

- 更新jest配置：
```js
const { defaults } = require('jest-config');

module.exports = {
  ...defaults,
  modulePathIgnorePatterns: ['<rootDir>/.history'],
  moduleDirectories: [
    ...defaults.moduleDirectories,
    'dist/node_modules'
  ],
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '^scheduler$': '<rootDir>/node_modules/scheduler/unstable_mock.js'
  },
  fakeTimers: {
    enableGlobally: true,
    legacyFakeTimers: true
  },
  setupFilesAfterEnv: ['./scripts/jest/setupJest.js']
};
```

当前我们为测试做的准备

- 针对 ReactDOM 宿主环境：ReactTestUtils
- 针对 Reconciler 的测试：React-Noop-Renderer
- 针对并发环境的测试：jest-react、Scheduler、React-Noop-Renderer 配合使用



