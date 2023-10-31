import type { Rule } from 'eslint';
import type { RecursiveCSS } from '../types';

interface Options {
  context: Rule.RuleContext;
  css: RecursiveCSS;
  message: string;
  properties: any[];
}

/**
 * Check if the css property is used in the object recursively
 * The object can be a styled component, a makeStyles hook, or a JSX element with sx or style
 */
export function checkCssPropertyRecursively({
  context,
  css,
  message,
  properties,
}: Options) {
  for (const property of properties) {
    if (
      property.type === 'Property' &&
      (property.key?.name === css.key ||
        (property.key?.type === 'Literal' &&
          property.key.value === css.literal))
    ) {
      context.report({
        message,
        node: property,
      });
    } else if (
      property.type === 'Property' &&
      property.value?.type === 'ObjectExpression'
    ) {
      checkCssPropertyRecursively({
        context,
        css,
        message,
        properties: property.value.properties,
      });
    } else if (property.type === 'Property' && property.key?.name === 'sx') {
      if (property.value?.type === 'ObjectExpression') {
        checkCssPropertyRecursively({
          context,
          css,
          message,
          properties: property.value.properties,
        });
      }
    } else if (
      property.type === 'Property' &&
      property.key?.name === 'style' &&
      property.value?.type === 'ObjectExpression'
    ) {
      checkCssPropertyRecursively({
        context,
        css,
        message,
        properties: property.value.properties,
      });

      return;
    }
  }
}
