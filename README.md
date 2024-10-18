# Athe

Uses an API from [feldarkrealms](https://feldarkrealms.com) to generate fake words. It
is basically a command-line interface for their fake word generator.

# Features

- flags to customize word generation.
- cross-platform copy to clipboard feature.
  - On Linux, the library requires you to have `xsel` package installed.

# How To Install

```
git clone --depth 1 <REPO URL>
cd athe
deno run install
```

Deno (v2) runtime is required for it to run.

You can also get self-constained executables from [GitHub Releases](https://github.com/eeriemyxi/athe/releases). Keep in mind they
are large in size for what little functionality this program has to offer.

# Command-Line Arguments

```
athe - generate fake words, fetched from feldarkrealms(.com).

--help,-h   : print this message
--lang,-l   : specify language, default: English
--words,-w  : specify how many words, default: 10, max: 10
--length,-L : specify word length, default: 6, max: 10
```
