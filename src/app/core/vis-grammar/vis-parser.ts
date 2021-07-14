import {CstParser} from 'chevrotain';
import * as visLexer from './vis-lexer';

class VisParser extends CstParser {
  constructor() {
    super(visLexer.allTokens);
    this.performSelfAnalysis();
  }

  public program = this.RULE('program', () => {
    this.SUBRULE(this.setSection);
    this.SUBRULE(this.playSection);
    this.SUBRULE(this.textSection);
  });

  public setSection = this.RULE('setSection', () => {
    this.CONSUME(visLexer.set);
    this.CONSUME(visLexer.lCurly);
    this.AT_LEAST_ONE({DEF: () => this.statement});
    this.CONSUME(visLexer.rCurly);
  });

  public playSection = this.RULE('playSection', () => {
    this.CONSUME(visLexer.set);
    this.CONSUME(visLexer.lCurly);
    this.AT_LEAST_ONE({DEF: () => this.SUBRULE(this.statement)});
    this.CONSUME(visLexer.rCurly);
  });

  public textSection = this.RULE('textSection', () => {
    this.CONSUME(visLexer.set);
    this.CONSUME(visLexer.lCurly);
    this.CONSUME(visLexer.template);
    this.CONSUME(visLexer.rCurly);
  });

  public statement = this.RULE('statement', () => {
    this.OR([
      {ALT: () => this.definitionStatement},
      {ALT: () => this.methodCall}
    ]);
    this.CONSUME(visLexer.semicolon);
  });

  public definitionStatement = this.RULE('definitionStatement', () => {
    this.CONSUME(visLexer.identifier);
    this.CONSUME(visLexer.eq);
    this.OR([
      {ALT: () => this.SUBRULE(this.basicConstruction)},
      {ALT: () => {
        this.SUBRULE(this.structureConstruction);
        this.SUBRULE(this.multipleInsertion);
        }
      },
      {ALT: () => this.CONSUME(visLexer.stringLiteral)},
      {ALT: () => this.CONSUME(visLexer.numberLiteral)}
    ]);
  });


  public basicConstruction = this.RULE('basicConstruction', () => {
    this.OR([
      {ALT: () => this.CONSUME(visLexer.node)},
      {ALT: () => this.CONSUME(visLexer.nodes)}
    ]);
    this.SUBRULE(this.callParams);
  });

  public structureConstruction = this.RULE('structureConstruction', () => {
    this.OR([
      {ALT: () => this.CONSUME(visLexer.array)},
      {ALT: () => this.CONSUME(visLexer.bsTree)},
      {ALT: () => this.CONSUME(visLexer.avlTree)},
      {ALT: () => this.CONSUME(visLexer.rbTree)},
      {ALT: () => this.CONSUME(visLexer.heapTree)},
      {ALT: () => this.CONSUME(visLexer.singlyLinkedList)},
      {ALT: () => this.CONSUME(visLexer.doublyLinkedList)}
    ]);
    this.SUBRULE(this.callParams);
  });

  public callParams = this.RULE('callParams', () => {
    this.CONSUME(visLexer.lParen);

    this.AT_LEAST_ONE_SEP({
      SEP: visLexer.comma,
      DEF: () => {
        this.OR([
          {ALT: () => this.CONSUME(visLexer.stringLiteral)},
          {ALT: () => this.CONSUME(visLexer.numberLiteral)}
        ]);
      }
    });

    this.CONSUME(visLexer.rParen);
  });

  public multipleInsertion = this.RULE('multipleInsertion', () => {
    this.CONSUME(visLexer.lSquare);
    this.AT_LEAST_ONE_SEP({
      SEP: visLexer.comma,
      DEF: () => {
        this.OR([
          {ALT: () => this.CONSUME(visLexer.numberLiteral)},
          {ALT: () => this.CONSUME(visLexer.identifier)},
        ]);
      }
    });
    this.CONSUME(visLexer.rSquare);
  });

  public methodCall = this.RULE('methodCall', () => {
    this.CONSUME(visLexer.identifier);
    this.SUBRULE(this.callParams);
  });

}

const visParser = new VisParser();

export default visParser;
