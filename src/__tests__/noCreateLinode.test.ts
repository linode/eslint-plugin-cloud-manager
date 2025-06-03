import { noCreateLinode } from '../rules/no-createLinode'
import { describe, it } from 'bun:test';
import { RuleTester } from 'eslint'; 

describe('noCreateLinode', () => { 
    it('should flag usage of createLinode', () => {
        const ruleTester = new RuleTester()  
        ruleTester.run('no-createLinode', noCreateLinode, {
            // catches direct call of fn but not indirect usage or any variable of that name
            valid: [
                'test()', 
                'createTestLinode()', 
                'const foo = createLinode; foo();',
                'const createLinode = 5;'
            ],
            invalid: [
                {
                    code: 'createLinode()',
                    errors: [{ messageId: 'createLinodeUsage' }],
                },
                {
                    code: 'createLinode({foo: 1, bar: "abc"})',
                    errors: [{ messageId: 'createLinodeUsage' }],
                },
                {
                    code: 'const linode = createLinode(resolvedCreatePayload);',
                    errors: [{ messageId: 'createLinodeUsage' }],
                },
            ],
        });
    });
});
