import React from 'react';
import renderer from 'react-test-renderer';
import { generateColor } from '../components/utilities/CrudTable/functions';


// genrateUrl
describe('Testing generateColor', () => {

    it('should equal primary', () => {
        expect(generateColor('view')).toBe('primary');
    })

    test('also should equal primary', () => {
        expect(generateColor('adslkfns')).toBe('primary');
    })

    it('should equal success', () => {
        expect(generateColor('edit')).toBe('success');
    })

    it('should equal primary', () => {
        expect(generateColor('delete')).toBe('danger');
    })
});
