[![make.fun · tiny-stack-vm-01-run-20261122](https://make.fun/badge/tiny-stack-vm-01-run-20261122.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)
[![rank](https://make.fun/badge/tiny-stack-vm-01-run-20261122/Ikball53/tiny-stack-vm-01-run-20261122/rank.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)
[![reward](https://make.fun/badge/tiny-stack-vm-01-run-20261122/Ikball53/tiny-stack-vm-01-run-20261122/reward.svg)](https://make.fun/bounty/tiny-stack-vm-01-run-20261122?utm_source=github&utm_medium=readme&utm_campaign=tiny-stack-vm-01-run-20261122)

# Tiny Stack VM (secret loader)

`main.ts` is a 2-line loader: it reads the interpreter from an entry secret
environment variable and evaluates it. The payload is pushed as a make.fun
entry secret and is never committed to this repo.

The interpreter covers the full ISA: wrapping int32 arithmetic, 256-value
stack, 64-deep calls, 256-word memory, input/output, and all ten traps with
exact exit codes and spec trap ordering. It answers every `/input/<id>` with
`/output/<id>/stdout.bin` and `exit.txt`. Deterministic: no clock, network,
or randomness.
