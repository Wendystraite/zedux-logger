---
'@wendystraite/zedux-logger': major
---

# Zedux v2 and new logger's API

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
