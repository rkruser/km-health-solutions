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

    
    test('setSubtree and getSubtree work correctly', () => {
        let secondCache = new APICache();
        secondCache.setValue(['keyA','keyB'], 'valueX');
        secondCache.setValue(['keyA','keyC'], 'valueY');
        secondCache.setValue(['keyD'], 'value999');
        apiCache.setSubtree(['key1'], secondCache.getTree().content);
        const result = apiCache.getSubtree(['key1']);
        expect(result.status).toBe('present');
        expect(result.content).toEqual(secondCache.getTree().content);

        apiCache.setSubtree(['key2'], secondCache.getSubtree(['keyA']).content);
        const result2 = apiCache.getSubtree(['key2']);
        expect(result2.status).toBe('present');
        expect(result2.content).toEqual(secondCache.getSubtree(['keyA']).content);

        console.log("******************************");
        console.log(apiCache.getTree().content);
        console.log("******************************");
    });
    

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
    */

    test('getCleanedDict returns cleaned dictionary', () => {
        let secondCache = new APICache();
        secondCache.setValue(['keyA','keyB'], 'valueX');
        secondCache.setValue(['keyA','keyC'], 'valueY');
        secondCache.setValue(['keyD'], 'value999');
        apiCache.setSubtree(['key1'], secondCache.getTree().content);
        apiCache.setSubtree(['key2'], secondCache.getSubtree(['keyA']).content);

        const cleanedDict = apiCache.getCleanedDict();
        expect(cleanedDict).toEqual({ 
            key1: {
                'keyA': {
                    'keyB': { _value: 'valueX'},
                    'keyC': { _value: 'valueY'}
                },
                'keyD': { _value: 'value999'}
            },
            key2: {
                'keyB': { _value: 'valueX'},
                'keyC': { _value: 'valueY'}        
            }
         });
         console.log('CLEANED*************************');
         console.log(cleanedDict);
         console.log('*************************');
    });
    

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

