# Zedux Logger

Logging utility for [Zedux](https://github.com/Omnistac/zedux).

⚠️ This library is a work in progress and has performance issues, **use only in development** ⚠️

A new stable 2.0.0 version is being worked on and will be available when zedux's v2 is available. See [#Planned](#Planned).

See https://github.com/Omnistac/zedux/discussions/194.

## Features

- Diffing old/new state of objects/arrays
- Graph grouped by namespaces
- Snapshot of the entire ecosystem
- Deobfuscting the scary single letters
- Emojis and colors
- Showing promise's state and dependent atoms that are waiting for it

## Install

```bash
npm install @wendystraite/zedux-logger
```

## How to use

```ts
const ecosystem = createEcosystem();
addZeduxLogger(ecosystem, loggerOptions);
```

## Planned

Theses features are being worked in the [v2 branch](https://github.com/Wendystraite/zedux-logger/tree/v2).

See [v2 branch's commit](https://github.com/Wendystraite/zedux-logger/compare/main...v2).

### Performances

Optimizing the logger
- Generate snapshot and graph incrementally
- Applying other optimizations
- Benchmarks

### Features

- Revisit the options for filtering
    - Either be able to add multiple logger with different options or be able to give an array of options to a single logger
    - Combined with that a way to include/exclude atom names / namespaces / tags / types / ..
    - And some options to customize everything or have a set of templates/options already made.
    - The idea behind this is to be able to log for example everything with less vibrant colors except a namespace of atoms that you want to debug.
    - Another idea is to disable a lot of logging for intensive atoms and be able to have the "Group similar" devtool feature kicking in for them.
- Have a way to disable colors and maybe disable the group (display an object at the end instead). This could be useful for downloading the logs and having only one line per log.
- Maybe revisit the "reasons" given. Sometimes the logger doesn't show any "reasons" (empty array) for something but should show something. I might experiment a bit to find a good balance.
- An API to build or insert custom logs. Might work on that after every other features.
- Default options

### Tests

A lot of tests. Good code coverage.

### Playground

A playground projet that can be run on codesandbox for you to play with
