export const ALPHABET = Array.from(
    { length: 26 },
    (_, i) => String.fromCharCode(i + 97),
);
export enum AnsiColor {
    BLACK = "\u001b[30m",
    RED = "\u001b[31m",
    GREEN = "\u001b[32m",
    YELLOW = "\u001b[33m",
    BLUE = "\u001b[34m",
    MAGENTA = "\u001b[35m",
    CYAN = "\u001b[36m",
    WHITE = "\u001b[37m",
    GRAY = "\u001b[90m",
    RESET = "\u001b[0m",
}

export const WORD_HTML_PATTERN_RE: RegExp = />(\w+)</gm;

export default { ALPHABET, AnsiColor, WORD_HTML_PATTERN_RE };
