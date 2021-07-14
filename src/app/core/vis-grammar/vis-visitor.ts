import visParser from './vis-parser';

const BaseCstVisitor = visParser.getBaseCstVisitorConstructor();

class VisVisitor extends BaseCstVisitor {
  constructor() {
    super();
    this.validateVisitor();
  }



}
