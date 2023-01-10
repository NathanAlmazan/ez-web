
export default function EzLanguageTokens() {
    return {  
        keywords: [
            'to', 'from', 'as', 'if', 'else', 'in', 'is', 
            'print', 'count', 'foreach', 'while', 'do',
            'put', 'out', 'task', 'on', 'off'
        ],
    
        typeKeywords: [
            'int', 'dec', 'ltr', 'wrd', 'btn'
        ],
    
        operators: [
            '+', '-', '*', '^', '/' , '%', '+=', '-=', '*=', '^', '/=' , 
            '<', '>', '<=', '>=', '!', '?', 'and', 'or', 'not'
        ],
    
        // we include these common regular expressions
        symbols:  /[=><!~?:&|+\-*\/\^%]+/,
    
        // C# style strings
        escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,
    
        // The main tokenizer for our languages
        tokenizer: {
        root: [
            // identifiers and keywords
            [/[a-z_$][\w$]*/, { cases: { '@typeKeywords': 'keyword',
                                        '@keywords': 'keyword',
                                        '@default': 'variable' } }],
            [/[A-Z][\w\$]*/, 'type.identifier' ],  // to show class names nicely
    
            // whitespace
            { include: '@whitespace' },
    
            // numbers
            [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
            [/0[xX][0-9a-fA-F]+/, 'number.hex'],
            [/\d+/, 'number'],
    
            // delimiter: after number because of .\d floats
            [/[;,.]/, 'delimiter'],
    
            // strings
            [/"([^"\\]|\\.)*$/, 'string.invalid' ],  // non-teminated string
            [/"/,  { token: 'string.quote', bracket: '@open', next: '@string' } ],
    
            // characters
            [/'[^\\']'/, 'string'],
            [/(')(@escapes)(')/, ['string','string.escape','string']],
            [/'/, 'string.invalid']
        ],
    
        comment: [
            [/[^\<>]+/, 'comment' ],
            [/\<\</,    'comment', '@push' ],    // nested comment
            ["\\>>",    'comment', '@pop'  ],
            [/[\<>]/,   'comment' ]
        ],
    
        string: [
            [/[^\\"]+/,  'string'],
            [/@escapes/, 'string.escape'],
            [/\\./,      'string.escape.invalid'],
            [/"/,        { token: 'string.quote', bracket: '@close', next: '@pop' } ]
        ],
    
        whitespace: [
            [/[ \t\r\n]+/, 'white'],
            [/\<\</,       'comment', '@comment' ]
        ],
        },
    };  
}