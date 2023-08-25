/*
Implements a simple cache structure for the API
*/

type CacheNodeType = {
    valuestatus: string;
    valuetimestamp: string;
    value: any;
    subtreestatus: string;
    subtreetimestamp: string;
    subtree: CacheLevelType;
}

type CacheLevelType = Record<string, CacheNodeType>;


type ReturnKeyStatus = {
    keystatus: string;
    node: CacheNodeType | null;
    keyIndexReached: number;
}

type ReturnStatus = {
    status: string;
    content: any;
}


class APICache {
    private cache: CacheLevelType;

    constructor() {
        this.cache = {};
    }

    traverse(keylist:string[], cacheLevel:CacheLevelType, prevKeyIndex=-1) {
        if (keylist.length === 0) {
            let returnval:ReturnKeyStatus = {
                keystatus: 'error:no_key_given',
                node: null,
                keyIndexReached: -1
            }
            return returnval;
        }
        else if (keylist.length === 1) {
            let key = keylist[0];
            if (key in cacheLevel) {
                let returnval:ReturnKeyStatus = {
                    keystatus: 'present',
                    node: cacheLevel[key],
                    keyIndexReached: prevKeyIndex+1
                }                
                return returnval;
            }
        }
        else {
            let [key, ...rest] = keylist;
            if (key in cacheLevel) {
                return this.traverse(rest, cacheLevel[key].subtree, prevKeyIndex+1);
            }
        }
        let returnval:ReturnKeyStatus = {
            keystatus: 'key_not_found',
            node: null,
            keyIndexReached: prevKeyIndex
        }
        return returnval;
    }

    getValue(keylist:string[]) {
        let returnnode:ReturnKeyStatus = this.traverse(keylist, this.cache);
        if (returnnode.keystatus === 'present') {
            let returnval: ReturnStatus = {
                status: returnnode.node ? returnnode.node.valuestatus : 'error:node_is_null',
                content: returnnode.node ? returnnode.node.value : null
            }
            return returnval;
        }
        else if (returnnode.keystatus === 'key_not_found') {
            let returnval = {
                status: returnnode.keystatus,
                content: {
                    keyIndexReached: returnnode.keyIndexReached,
                    keysFound: keylist.slice(0,returnnode.keyIndexReached+1)
                }
            }
            return returnval;
        }
        let returnval = {
            status: returnnode.keystatus,
            content: null
        }
        return returnval;
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