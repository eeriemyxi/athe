import { parseArgs } from "jsr:@std/cli/parse-args";
import { Spinner } from "https://deno.land/std@0.224.0/cli/mod.ts";
import * as clipboard from "https://deno.land/x/copy_paste/mod.ts";

const ALPHABET = Array.from(
    { length: 26 },
    (_, i) => String.fromCharCode(i + 97),
);
const COLORS = {
    black: "\u001b[30m",
    red: "\u001b[31m",
    green: "\u001b[32m",
    yellow: "\u001b[33m",
    blue: "\u001b[34m",
    magenta: "\u001b[35m",
    cyan: "\u001b[36m",
    white: "\u001b[37m",
    gray: "\u001b[90m",
    reset: "\u001b[0m",
};

const WORD_HTML_PATTERN_RE: RegExp = />(\w+)</gm;
const Specification = { lang: "English", words: 10, length: 6 };
const HELP_DESC = [
    "athe - generate fake words, fetched from feldarkrealms(.com).\n",
    `--help,-h   : print this message`,
    `--lang,-l   : specify language, default: ${Specification.lang}`,
    `--words,-w  : specify how many words, default: ${Specification.words}, max: 10`,
    `--length,-L : specify word length, default: ${Specification.length}, max: 10`,
];

const flags = parseArgs(Deno.args, {
    boolean: ["help", "h"],
    string: ["l"],
    // @ts-ignore: LMK if you know to do it properly.
    integer: ["w", "L"],
    default: {
        l: Specification.lang,
        w: Specification.words,
        L: Specification.length,
    },
    alias: {
        lang: "lang",
        language: "lang",
        words: "w",
        length: "L",
    },
});

if (flags.help || flags.h) {
    console.log(HELP_DESC.join("\n"));
    Deno.exit();
}

Specification.lang = flags.l;
Specification.words = <number> flags.w;
Specification.length = <number> flags.L;

const API_URL = "https://feldarkrealms.com/src/words.php";

if (import.meta.main) {
    const alphabet = ALPHABET.slice();
    const spinner = new Spinner({
        message: "Fetching names from feldarkrealms...",
    });

    const form = new FormData();
    Object.entries(Specification).forEach(([key, value]) => {
        form.append(key, value.toString());
    });

    spinner.start();
    const response = await fetch(API_URL, {
        method: "POST",
        body: form,
    });
    const text = await response.text();
    spinner.stop();

    const matches = text.matchAll(WORD_HTML_PATTERN_RE);
    const matches_obj = Object.fromEntries(
        matches.map((match) => [alphabet.shift(), match[1]]),
    );

    console.log(COLORS.white + "Generated Words" + COLORS.reset);
    console.log(
        Array.from(
            Object.entries(matches_obj).map((entry) =>
                `(${COLORS.cyan + entry[0] + COLORS.reset}) ${entry[1]}`
            ),
        ).join("\n"),
    );

    const index = prompt(`Copy a word ("qq" to exit):`) ||
        "a";
    if (index == "qq") {
        Deno.exit();
    }

    await clipboard.writeText(matches_obj[index]);
    console.log("Copied to clipboard:", matches_obj[index]);
}
