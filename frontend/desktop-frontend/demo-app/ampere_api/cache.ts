/*
Implements a simple cache structure for the API
*/

type CacheEntryType = {
    status: string;
    timestamp: string;
    value: CacheLevelType | string;
}

type CacheLevelType = Record<string, CacheEntryType>;

type ReturnStatus = {
    status: string;
    indexReached: number;
    value: string | null;
}

class APICache {
    private cache: CacheLevelType;

    constructor() {
        this.cache = {};
    }

    get(keylist:string[]) {
        let i=0;
        let proceed=true;
        let status = '';
        let dictObject = this.cache;
        let value = '';
        while (proceed && i<keylist.length) {
            let key = keylist[i];
            if (!(key in dictObject)) {
                status = 'key_not_found';
                proceed = false;
            }
            else {
                let entry = dictObject[key];
                status = entry.status;                
                if (status !== 'present') {
                    proceed = false;
                }
                else if (typeof(entry.value) === 'string') {
                    value = entry.value;
                    proceed = false;
                }
                else {
                    dictObject = entry.value;
                    ++i;
                }
            }
        }

        if (i === keylist.length) {
            status = 'insufficient_keys'
        }

        return {
            status: status,
            indexReached: i,
            value: value
        }

    }



    set(keylist:string[], value:string) {
        //this.cache[key] = value;
    }
    delete(key) {
        delete this.cache[key];
    }
    flush(keylist:string[]) {
        
    }
}