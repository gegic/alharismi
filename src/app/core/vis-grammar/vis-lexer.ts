import {createToken, Lexer} from 'chevrotain';

// highest level tokens
const set = createToken({name: 'set', pattern: /set/});
const play = createToken({name: 'play', pattern: /play/});
const text = createToken({name: 'text', pattern: /text/});

const node = createToken({name: 'node', pattern: /node/});
const nodes = createToken({name: 'nodes', pattern: /nodes/});
const array = createToken({name: 'array', pattern: /array/});
const bsTree = createToken({name: 'bsTree', pattern: /bsTree/});
const avlTree = createToken({name: 'avlTree', pattern: /avlTree/});
const rbTree = createToken({name: 'rbTree', pattern: /rbTree/});
const heapTree = createToken({name: 'heapTree', pattern: /heapTree/});
const singlyLinkedList = createToken({name: 'singlyLinkedList', pattern: /singlyLinkedList/});
const doublyLinkedList = createToken({name: 'doublyLinkedList', pattern: /doublyLinkedList/});

const lCurly = createToken({ name: 'lCurly', pattern: /{/ });
const rCurly = createToken({ name: 'rCurly', pattern: /}/ });
const lSquare = createToken({ name: 'lSquare', pattern: /\[/ });
const rSquare = createToken({ name: 'rSquare', pattern: /]/ });

const lParen = createToken({name: 'lParen', pattern: /\(/});
const rParen = createToken({name: 'rParen', pattern: /\)/});

const eq = createToken({name: 'equals', pattern: /=/});
const dot = createToken({name: 'dot', pattern: /\./});
const comma = createToken({name: 'comma', pattern: /,/});
const semicolon = createToken({name: 'semicolon', pattern: /;/});

const template = createToken({ name: 'template', pattern: /<vis>((.|\n)*)<\/vis>/});

const identifier = createToken({ name: 'identifier', pattern: /[a-zA-Z]\w*/ });

const stringLiteral = createToken({
  name: 'stringLiteral',
  pattern: /"(:?[^\\"]|\\(:?[bfnrtv"\\/]|u[0-9a-fA-F]{4}))*"/
});

const numberLiteral = createToken({
  name: 'numberLiteral',
  pattern: /-?(0|[1-9]\d*)(\.\d+)?([eE][+-]?\d+)?/
});

const whiteSpace = createToken({
  name: 'whiteSpace',
  pattern: /[ \t\n\r]+/,
  group: Lexer.SKIPPED
});

const allTokens = [
  set,
  play,
  text,
  node,
  nodes,
  array,
  bsTree,
  avlTree,
  rbTree,
  heapTree,
  singlyLinkedList,
  doublyLinkedList,
  lCurly,
  rCurly,
  lSquare,
  rSquare,
  lParen,
  rParen,
  eq,
  dot,
  comma,
  semicolon,
  template,
  identifier,
  stringLiteral,
  numberLiteral,
  whiteSpace
];

const VisLexer = new Lexer(allTokens);

export {
  set,
  play,
  text,
  node,
  nodes,
  array,
  bsTree,
  avlTree,
  rbTree,
  heapTree,
  singlyLinkedList,
  doublyLinkedList,
  lCurly,
  rCurly,
  lSquare,
  rSquare,
  lParen,
  rParen,
  eq,
  dot,
  comma,
  semicolon,
  template,
  identifier,
  stringLiteral,
  numberLiteral,
  whiteSpace,
  allTokens
};
export default VisLexer;
