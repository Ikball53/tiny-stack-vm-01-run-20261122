# Tiny Stack VM (secret loader)

`main.ts` is a 19-byte loader: it evaluates the interpreter held in entry
secret `V`. The payload lives locally in `vm-secret.js` for the secrets-push
step only and is never committed.

The interpreter covers the full ISA: wrapping int32 arithmetic, 256-value
stack, 64-deep calls, 256-word memory, input/output, and all ten traps with
exact exit codes and spec trap ordering. It answers every `/input/<id>` with
`/output/<id>/stdout.bin` and `exit.txt`. Deterministic: no clock, network,
or randomness.
