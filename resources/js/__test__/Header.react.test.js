import React from 'react';
import renderer from 'react-test-renderer';
const { generateUrl } = require('../components/utilities/CrudTable/CrudTableAction');

describe('Url generation', () => {

    it('should equal 4', () => {
        expect(sum(2, 2)).toBe(4);
    })

    test('also should equal 4', () => {
        expect(sum(2, 2)).toBe(4);
    })
});
