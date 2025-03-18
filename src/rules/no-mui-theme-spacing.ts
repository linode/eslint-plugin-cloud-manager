import type { Rule } from 'eslint';

/**
 * Prohibit direct usage of theme.spacing() method
 * This rule warns when the deprecated method is used and recommends theme.spacingFunction instead
 */
export const noThemeSpacingMethod: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      category: 'Best Practices',
      recommended: true,
      description:
        'Disallow the use of theme.spacing() method. Use theme.spacingFunction instead.',
    },
    messages: {
      themeSpacingMethodUsage: `Use of theme.spacing() method is deprecated. Use theme.spacingFunction instead. See: https://linode.github.io/manager/development-guide/16-design-tokens.html#spacing`
    }
  },
  create: function(context) {
    return {
      // CallExpression is any function call
      CallExpression: function(node: any) {
        const callee = node.callee || {};

        if (
          callee.type === 'MemberExpression' &&
          callee.object &&
          callee.object.name === 'theme' &&
          callee.property &&
          callee.property.name === 'spacing'
        ) {
          context.report({
            node: node,
            messageId: 'themeSpacingMethodUsage'
          });
        }
      }
    }
  }
};