import { checkCssPropertyRecursively } from '../utils/checkCssPropertyRecursively';

import type { Rule } from 'eslint';

describe('checkCssPropertyRecursively', () => {
  let context: Rule.RuleContext;

  beforeEach(() => {
    context = {
      report: jest.fn(),
    } as unknown as Rule.RuleContext;
  });

  it('should report a property with matching key', () => {
    const css = { key: 'color', literal: '' };
    const properties = [{ type: 'Property', key: { name: 'color' } }];
    const message = 'Custom message';

    checkCssPropertyRecursively({ context, css, message, properties });

    expect(context.report).toHaveBeenCalledWith({
      message,
      node: properties[0],
    });
  });

  it('should report a property with matching literal key', () => {
    const css = { key: '', literal: 'color' };
    const properties = [
      { type: 'Property', key: { type: 'Literal', value: 'color' } },
    ];
    const message = 'Custom message';

    checkCssPropertyRecursively({ context, css, message, properties });

    expect(context.report).toHaveBeenCalledWith({
      message,
      node: properties[0],
    });
  });

  it('should recursively check properties of an ObjectExpression', () => {
    const css = { key: 'color', literal: undefined };
    const properties = [
      {
        type: 'Property',
        key: { name: 'nested' },
        value: {
          type: 'ObjectExpression',
          properties: [{ type: 'Property', key: { name: 'color' } }],
        },
      },
    ];
    const message = 'Custom message';

    checkCssPropertyRecursively({ context, css, message, properties });

    expect(context.report).toHaveBeenCalledWith({
      message,
      node: properties[0].value.properties[0],
    });
  });

  it('should not report when no matching properties are found', () => {
    const css = { key: 'color', literal: undefined };
    const properties = [
      { type: 'Property', key: { name: 'background' } },
      { type: 'Property', key: { name: 'font-size' } },
    ];
    const message = 'Custom message';

    checkCssPropertyRecursively({ context, css, message, properties });

    expect(context.report).not.toHaveBeenCalled();
  });

  it('should handle properties with "sx" key and ObjectExpression value', () => {
    const css = { key: 'color', literal: undefined };
    const properties = [
      {
        type: 'Property',
        key: { name: 'sx' },
        value: {
          type: 'ObjectExpression',
          properties: [{ type: 'Property', key: { name: 'color' } }],
        },
      },
    ];
    const message = 'Custom message';

    checkCssPropertyRecursively({ context, css, message, properties });

    expect(context.report).toHaveBeenCalledWith({
      message,
      node: properties[0].value.properties[0],
    });
  });

  it('should handle "style" property with ObjectExpression value', () => {
    const css = { key: 'color', literal: undefined };
    const properties = [
      {
        type: 'Property',
        key: { name: 'style' },
        value: {
          type: 'ObjectExpression',
          properties: [{ type: 'Property', key: { name: 'color' } }],
        },
      },
    ];
    const message = 'Custom message';

    checkCssPropertyRecursively({ context, css, message, properties });

    expect(context.report).toHaveBeenCalledWith({
      message,
      node: properties[0].value.properties[0],
    });
  });
});
