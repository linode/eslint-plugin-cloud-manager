import { describe, it, beforeEach, vi, expect } from 'vitest';
import type { Rule } from 'eslint';

import { noThemeSpacingMethod } from '../rules/no-mui-theme-spacing';

describe('noThemeSpacingMethod', () => {
  const ruleTester = (code: string) => {
    let context: Rule.RuleContext;
    let callExpressionHandler: ((node: any) => void) | null = null;

    beforeEach(() => {
      context = {
        report: vi.fn(),
      } as unknown as Rule.RuleContext;

      // Get the call expression handler from the rule
      const handlers = noThemeSpacingMethod.create(context);
      // Ensure handler exists before assigning
      callExpressionHandler = handlers.CallExpression || null;
    });

    it('should report usage of theme.spacing() method', () => {
      // Mock AST node for theme.spacing(2)
      const node = {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            name: 'theme'
          },
          property: {
            name: 'spacing'
          }
        },
        arguments: [
          {
            type: 'Literal',
            value: 2
          }
        ]
      };

      if (callExpressionHandler) {
        callExpressionHandler(node);
      }

      expect(context.report).toHaveBeenCalledWith({
        node: node,
        messageId: 'themeSpacingMethodUsage'
      });
    });

    it('should report usage of theme.spacing() with multiple arguments', () => {
      // Mock AST node for theme.spacing(2, 3)
      const node = {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            name: 'theme'
          },
          property: {
            name: 'spacing'
          }
        },
        arguments: [
          {
            type: 'Literal',
            value: 2
          },
          {
            type: 'Literal',
            value: 3
          }
        ]
      };

      if (callExpressionHandler) {
        callExpressionHandler(node);
      }

      expect(context.report).toHaveBeenCalledWith({
        node: node,
        messageId: 'themeSpacingMethodUsage'
      });
    });

    it('should report usage of theme.spacing() with variable arguments', () => {
      // Mock AST node for theme.spacing(variable)
      const node = {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            name: 'theme'
          },
          property: {
            name: 'spacing'
          }
        },
        arguments: [
          {
            type: 'Identifier',
            name: 'spacing'
          }
        ]
      };

      if (callExpressionHandler) {
        callExpressionHandler(node);
      }

      expect(context.report).toHaveBeenCalledWith({
        node: node,
        messageId: 'themeSpacingMethodUsage'
      });
    });

    it('should not report usage of theme.spacingFunction', () => {
      // Mock AST node for theme.spacingFunction(2)
      const node = {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            name: 'theme'
          },
          property: {
            name: 'spacingFunction'
          }
        },
        arguments: [
          {
            type: 'Literal',
            value: 2
          }
        ]
      };

      if (callExpressionHandler) {
        callExpressionHandler(node);
      }

      expect(context.report).not.toHaveBeenCalled();
    });

    it('should not report usage of other theme methods', () => {
      // Mock AST node for theme.palette()
      const node = {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            name: 'theme'
          },
          property: {
            name: 'palette'
          }
        },
        arguments: []
      };

      if (callExpressionHandler) {
        callExpressionHandler(node);
      }

      expect(context.report).not.toHaveBeenCalled();
    });

    it('should not report non-theme spacing method calls', () => {
      // Mock AST node for otherObject.spacing()
      const node = {
        type: 'CallExpression',
        callee: {
          type: 'MemberExpression',
          object: {
            name: 'otherObject'
          },
          property: {
            name: 'spacing'
          }
        },
        arguments: []
      };

      if (callExpressionHandler) {
        callExpressionHandler(node);
      }

      expect(context.report).not.toHaveBeenCalled();
    });
  };

  describe('rule functionality', () => {
    ruleTester('const margin = theme.spacing(2);');
  });
});