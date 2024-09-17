import type { Rule } from 'eslint';

/**
 * Warn about Formik usage.
 * Promote the use of React Hook Form.
 */
export const deprecateFormik: Rule.RuleModule = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Warn about Formik being deprecated in favor of react-hook-form.',
      category: 'Best Practices',
      recommended: false,
    },
    messages: {
      formikUsage: 'Formik is being deprecated. Please use react-hook-form. Learn more at https://linode.github.io/manager/development-guide/15-composition.html#form-composition',
    },
  },
  create(context) {
    return {
      Identifier(node) {
        if (node.name === 'useFormik' || node.name === 'Formik') {
          context.report({
            node,
            messageId: 'formikUsage',
          });
        }
      },
    };
  },
};
