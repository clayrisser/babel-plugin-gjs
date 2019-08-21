import _ from 'lodash';
import template from '@babel/template';

const options = {};

module.exports = () => ({
  visitor: {
    ClassDeclaration(path) {
      const node = templateAst(
        `const ${path.node.id.name} = GObject.registerClass()`
      );
      if (
        path.parent.type !== 'CallExpression' ||
        path.parent.callee?.property?.name !== 'registerClass'
      ) {
        const identifier = path.scope.generateUidIdentifier(path.node.id.name);
        node.declarations[0].init.arguments.push(identifier);
        path.node.id.name = identifier.name;
        path.insertAfter(node);
        path.traverse({
          ClassMethod(path) {
            if (
              path.node.kind === 'constructor' &&
              path.node.key.name === 'constructor'
            ) {
              path.node.kind = 'method';
              path.node.key.name = '_init';
              path.traverse({
                ExpressionStatement(path) {
                  if (path.node.expression?.callee?.type === 'Super') {
                    const node = templateAst('super._init()');
                    node.expression.arguments = path.node.expression.arguments;
                    path.replaceWith(node);
                  }
                }
              });
            }
          }
        });
      }
    }
  }
});

function templateAst(code, codePath = '') {
  if (Array.isArray(codePath)) {
    codePath = _.flattenDeep(codePath)
      .filter(s => s.length)
      .join('.');
  }
  if (codePath) return _.get(template.ast(code, options), codePath);
  return template.ast(code, options);
}
