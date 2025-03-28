# Zedux Logger

Logging utility for [Zedux](https://github.com/Omnistac/zedux).

⚠️ This library is a work in progress and has performance issues, **use only in development** ⚠️

See https://github.com/Omnistac/zedux/discussions/194.

## Features

- 🚀 Compatible with [Zedux](https://github.com/Omnistac/zedux) [v2](https://github.com/Omnistac/zedux/issues/118)
- 🎨 **Fully customizable**, can show, hide, reorder or configure anything displayed in the logs
- 📊 Can either use **grouped logs** (console.group) or **one line logs** (console.log)
- 😄 **Emojis**
- 🌈 **Colors**, with colorblind friendly templates
- 🔍 **Diffing** old/new state of objects/arrays
- 📈 Flat / Top Down / Bottom up default **graphs** and a custom graph grouped by namespaces
- 📸 **Snapshot** of the entire ecosystem
- 🔮 **Deobfuscate** the scary single letters in zedux's internals
- ⏳ Showing atoms **promise's state** and dependent atoms that are waiting for it
- ⏱️ Tracking of nodes **execution time**, warns if anything is slow
- ⚙️ Can change the logger's **options in runtime**
- 🖥️ Can change the **console used**
- 📡 Can show **any zedux events**
- 🎯 Apply **custom options** based on nodes ids, types, template or tags
- 📝 **Templates** (of options) support, can create custom templates or use built in ones

## Install

```bash
npm install --dev @wendystraite/zedux-logger
```

```bash
yarn add -D @wendystraite/zedux-logger
```

```bash
pnpm install --dev @wendystraite/zedux-logger
```

## How to use

Basic logger (vanilla js) :

```ts
const ecosystem = createEcosystem();
addZeduxLogger(ecosystem);
```

Basic logger (react) :

```tsx
export function ZeduxProvider({ children }: PropsWithChildren) {
  // Create an ecosystem with the logger attached
  const ecosystem = useMemo(() => {
    const ecosystem = createEcosystem();
    addZeduxLogger(ecosystem);
    return ecosystem;
  }, []);

  // Provides it
  return (
    <EcosystemProvider ecosystem={ecosystem}>{children}</EcosystemProvider>
  );
}
```

With options :

```ts
addZeduxLogger(ecosystem, {
  templates: [
    // Use color blind colors
    'colors-color-blind-okabe-ito',
    // Use `console.log` instead of `console.group`
    'one-line-logs'
  ],
  filters: [
    {
      exclude: [
        // Don't log any @memo or @signals atoms
        { type: ['@memo', '@signal'] },
        // Don't log any atoms with the tag 'no-log'
        { tag: 'disable-log' },
      ],
    },
  ],
  options: {
    // Only enabled in DEV mode (on Vite)
    enabled: import.meta.env.DEV,
  }
});
```

## Playground

A playground project can be found in the `playground` folder.

## Tests

90% tests coverage.

## Benchmarks

[bench-results](./benchmarks/bench-results.md)

## Planned

Optimizing the logger

- Stabilize the incremental graph generation
- Applying other optimizations
