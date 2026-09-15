# Greeting name examples (Node 22)

These examples document expected behavior under the agreed greeting contract,
not proof that the CLI is implemented, tested, qualified, or passing. Each
expected-output block shows exact stdout: one greeting followed by one newline.

Commands use POSIX-shell notation: single quotes group text into one argument;
the shell removes the delimiting quotes. This notation does not imply a platform
support requirement. Name arguments (after `greeting.mjs`) are joined in order
with one literal space between adjacent arguments, then surrounding whitespace
is trimmed. Interior whitespace is preserved. An empty result uses `World`.

## Single name

`node greeting.mjs Ada` supplies one name argument, `Ada`.

Expected output:

```text
Hello, Ada!
```

## Different argument boundaries, same greeting

- `node greeting.mjs Ada Lovelace` supplies two name arguments: `Ada` and `Lovelace`.
- `node greeting.mjs 'Ada Lovelace'` supplies one name argument, `Ada Lovelace`,
  containing one space.

Joining with one space before trimming produces the same name in both cases.
Expected output for either invocation:

```text
Hello, Ada Lovelace!
```

## Absent or blank name

- `node greeting.mjs` supplies no name arguments.
- `node greeting.mjs '   '` supplies one name argument containing three spaces.

The joined and trimmed name is empty in each case, so both use the fallback.
Expected output for either invocation:

```text
Hello, World!
```

## Preserved interior whitespace

`node greeting.mjs '  Ada  Lovelace  '` supplies one name argument. Trimming
removes the two leading and two trailing spaces but preserves the two interior
spaces between `Ada` and `Lovelace`.

Expected output:

```text
Hello, Ada  Lovelace!
```
