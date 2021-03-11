import React from 'react';
import renderer from 'react-test-renderer';
import { getDataAttribute } from '../components/utilities/CrudTable/functions';


// genrateUrl
describe('Testing getDataAttribute', () => {

    it('should equal 2', () => {
        expect(getDataAttribute('client_id', {'data-client_id': 2})).toBe(2);
    })

    test('also also equal primary', () => {
        expect(getDataAttribute('session_id', {'data-session_id': 2})).toBe(2);
    })

});
