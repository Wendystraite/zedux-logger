# zedux-logger

## 2.1.0

### Minor Changes

- a77134f: Bump zedux to 2.0.0-rc.7

  Show @memo nodes in the graph and in the snapshot.

### Patch Changes

- 6e3ba74: Better performances if waiting promises option is disabled

## 2.0.2

### Patch Changes

- 192f3a5: Fix some node keys that were not deobfuscated
- c358812: better performances during nodes deobfuscation

## 2.0.1

### Patch Changes

- bfb884a: Prevent false positives when calculating execution time of nodes
- 1c63d17: Bump zedux to 2.0.0-rc.5

## 2.0.0

### Major Changes

- 73aecf8: # Zedux v2 and new logger's API

  ## Zedux v2

  Updated to zedux 2.0.0-rc.0.

  ## Logger's API

  The logger's options are revisited :

  - All options are now optionals with default values.
  - Filters
    - Filters can include or exclude by ids, types, template or tag.
    - Share the same filtering logic as zedux ecosystem's findAll method.
  - Global options
    - Global options are shared across all filters
  - Local options
    - Local options can be changed based on filters.
  - Templates
    - Templates are predefined group of options that can be applied either globally or by filter.
    - There are built in templates and also a way to add you own templates.
  - The logger also returns a cleanup function instead of the ecosystem.

  ## Options

  New options :

  - An advanced log handler. You can reorder or add any log.
  - The max length of stringified state
  - Can show colors
  - Can log everything with either grouped logs (console.group) or one line logs (console.log)
  - Colors
  - Execution time tracking
  - Debug options
  - Option to toggle deobfuscation.

  Changed :

  - events renamed to eventsToShow. Can now be either an object or an array.
  - flags renamed to tags
  - additionalInfos renamed to details

  ## Zedux logger atom

  - Export an atom `zeduxLoggerAtom` to change the options.

  ## Incremental graph and snapshot

  - Incremental snapshot is already available and stable
  - Incremental graph is disabled by default and needs more work and tests before being enabled by default

  ## Basic logger

  - Export a very basic logger `addBasicZeduxLogger`.

  ## Playground

  - A playground project is available. It includes some logs when starting up and some buttons to generate logs.
  - Will be completed later to better illustrate the logger's options.

  ## Fixes

  - Protect diffs from circular objects
  - Incrementally update the snapshot instead of using ecosystem.dehydrate.
  - better display of diffs
    - For one lines logs, diffs were displayed as multiple keys of an object instead of an array.
    - For grouped logs, no diffs was showing undefined as value instead of nothing.
  - don't log if no details nor summary
  - a space character was added as prefix of all logs
  - don't hide promiseChange event
    - Will maybe be re-added later as an option. The motivation was originally to avoid showing two promise changed events from the cycle event and the promise change event.

  ## Internally

  - Some internal refactor
  - The logger's state is now in the ecosystem internal storage. Nothing is hidden from you.

  ## Benchmarks

  - Benchmarks added for the logger in the `benchmarks` folder.
  - Performances will be the next concern of this package.

  ## Tests

  - 297 tests added ! Some tests are missing for some options but the package can be considered stable enough to be used.

### Patch Changes

- c3e90e1: Fix console option not used in groups

## 1.0.3

### Patch Changes

- 10d7d7f: Don't push test files
- 451730a: Remove test files from dist

## 1.0.2

### Patch Changes

- bda771f: Export Options type

## 1.0.1

### Patch Changes

- b0c2b77: Initial version
