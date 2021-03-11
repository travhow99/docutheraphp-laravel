import { generateColor } from '../components/utilities/CrudTable/functions';

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

    it('should equal danger', () => {
        expect(generateColor('delete')).toBe('danger');
    })
});
