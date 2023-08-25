import { APICache } from '../cache'; // Replace with the correct relative path to your APICache file

describe('APICache', () => {
    let apiCache:APICache;

    beforeEach(() => {
        apiCache = new APICache();
    });

    test('getValue returns error status for empty cache', () => {
        const result = apiCache.getValue(['key1']);
        expect(result.status).toBe('key_not_found');
    });

    test('setValue and getValue work correctly', () => {
        apiCache.setValue(['key1'], 'value1');
        const result = apiCache.getValue(['key1']);
        expect(result.status).toBe('present');
        expect(result.content).toBe('value1');
    });

    test('set value with multiple keys in path', ()=>{
        apiCache.setValue(['key1','key2','key3'], "value!!");
        const result = apiCache.getValue(['key1','key2','key3']);
        expect(result.status).toBe('present');
        expect(result.content).toBe('value!!');
        apiCache.setValue(['key1','key2','key4'], "value4!!");
        const result2 = apiCache.getValue(['key1','key2','key4']);
        expect(result2.status).toBe('present');
        expect(result2.content).toBe('value4!!');
        const result3 = apiCache.getValue(['key1','key2']);
        expect(result3.status).toBe('none');
        expect(result3.content).toBe(null);
    })

    test('getSubtree returns error status for empty cache', () => {
        const result = apiCache.getSubtree(['key1']);
        expect(result.status).toBe('key_not_found');
    });

    /*
    test('setSubtree and getSubtree work correctly', () => {
        apiCache.setSubtree(['key1'], { subkey1: 'subvalue1' });
        const result = apiCache.getSubtree(['key1']);
        expect(result.status).toBe('present');
        expect(result.content).toEqual({ subkey1: 'subvalue1' });
    });
    */

    test('hasValue works correctly', () => {
        apiCache.setValue(['key1'], 'value1');
        expect(apiCache.hasValue(['key1'])).toBe(true);
        expect(apiCache.hasValue(['key_not_present'])).toBe(false);
    });

    /*
    test('hasSubtree works correctly', () => {
        apiCache.setSubtree(['key1'], { subkey1: 'subvalue1' });
        expect(apiCache.hasSubtree(['key1'])).toBe(true);
        expect(apiCache.hasSubtree(['key_not_present'])).toBe(false);
    });

    test('getCleanedDict returns cleaned dictionary', () => {
        apiCache.setValue(['key1'], 'value1');
        apiCache.setSubtree(['key1'], { subkey1: 'subvalue1' });
        const cleanedDict = apiCache.getCleanedDict();
        expect(cleanedDict).toEqual({ key1: { _value: 'value1', subkey1: 'subvalue1' } });
    });
    */

    test('flush cleans a key', () => {
        apiCache.setValue(['key1'], 'value1');
        apiCache.flush(['key1']);
        expect(apiCache.hasValue(['key1'])).toBe(false);
    });

    test('flushPending cleans non-present values', () => {
        apiCache.setValue(['key1'], 'value1');
        apiCache.setValue(['key2'], 'value2', 'pending');
        apiCache.flushPending();
        expect(apiCache.hasValue(['key1'])).toBe(true);
        expect(apiCache.hasValue(['key2'])).toBe(false);
    });
});

