import type { Rule } from 'eslint';

/**
 * Prohibit direct usage of createLinode method
 * This rule should only be enforced within test files, where createTestLinode should be used instead,
 * except for within the createTestLinode method itself
 */
export const noCreateLinode: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
    category: 'Best Practices',
    recommended: false,
    description:
    'Disallow the use of createLinode. This rule should be applied only within test files.', 
    },
    messages: {
        createLinodeUsage: `Unsafe to use createLinode method directly within test files. Please use createTestLinode method instead.` 
           
    }
  },
  create: function(context) {
    const CREATE_LINODE_FUNCTION_NAME = 'createLinode';
    return {
    // CallExpression is any function call, whether foo.bar() or just bar()
    // fn is flagged when it is called, not when it is imported into module
    CallExpression: function(node: any) {
        const callee = node.callee || {}; 
        if (
          callee &&
          callee.name === CREATE_LINODE_FUNCTION_NAME
        ) {
            context.report({
            node: node,
            messageId:'createLinodeUsage'})
        }
      }
    }
  }
  
};
