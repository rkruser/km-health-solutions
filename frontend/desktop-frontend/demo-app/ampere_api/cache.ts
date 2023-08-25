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

function makeCacheNode(vals:Partial<CacheNodeType>): CacheNodeType {
    const defaultCacheNode = {
        valuestatus: 'none',
        valuetimestamp: Date(),
        value: null,
        subtreestatus: 'empty',
        subtreetimestamp: Date(),
        subtree: {}
    }
    return {
        ...defaultCacheNode,
        ...vals
    }
}

type CacheLevelType = Record<string, CacheNodeType>;


type ReturnKeyStatus = {
    keystatus: string;
    node: CacheNodeType | null;
    keyIndexReached: number;
}

function makeReturnKeyStatus(vals:Partial<ReturnKeyStatus>): ReturnKeyStatus {
    const defaultReturnKeyStatus = {
        keystatus: 'error',
        node: null,
        keyIndexReached: -1
    }
    return {
        ...defaultReturnKeyStatus,
        ...vals
    }
}

type ReturnStatus = {
    status: string;
    content: any;
}

function makeReturnStatus(vals:Partial<ReturnStatus>): ReturnStatus {
    const defaultReturnStatus = {
        status: 'error',
        content: null
    }
    return {
        ...defaultReturnStatus,
        ...vals
    }
}


export class APICache {
    private cache: CacheLevelType;

    constructor() {
        this.cache = {};
    }

    static traverse(keylist:string[], 
                    cacheLevel:CacheLevelType, 
                    prevKeyIndex:number=-1, 
                    force_create:boolean=false,
                    prevNode:CacheNodeType|null=null): ReturnKeyStatus {
        if (keylist.length === 0) {
            return makeReturnKeyStatus({ keystatus: 'error:no_key_given' });
        }
        else if (keylist.length === 1) {
            let key = keylist[0];
            if (key in cacheLevel) {
                return makeReturnKeyStatus({
                    keystatus: 'present',
                    node: cacheLevel[key],
                    keyIndexReached: prevKeyIndex+1
                });
            }
            else if (force_create) {
                cacheLevel[key] = makeCacheNode({});
                return makeReturnKeyStatus({
                    keystatus: 'present',
                    node: cacheLevel[key],
                    keyIndexReached: prevKeyIndex+1
                });
            }
        }
        else {
            let [key, ...rest] = keylist;
            if (key in cacheLevel) {
                return APICache.traverse(rest, 
                                        cacheLevel[key].subtree, 
                                        prevKeyIndex+1, 
                                        force_create,
                                        cacheLevel[key]);
            }
            else if (force_create) {
                cacheLevel[key] = makeCacheNode({ subtreestatus: 'present' });
                return APICache.traverse(rest, 
                    cacheLevel[key].subtree, 
                    prevKeyIndex+1, 
                    force_create,
                    cacheLevel[key]);
            }
        }

        return makeReturnKeyStatus({
            keystatus: 'key_not_found',
            node: prevNode,
            keyIndexReached: prevKeyIndex
        });
    }

    getValue(keylist:string[]): ReturnStatus {
        let returnnode = APICache.traverse(keylist, this.cache);
        if (returnnode.keystatus === 'present') {
            return makeReturnStatus({
                status: returnnode.node ? returnnode.node.valuestatus : 'error:node_is_null',
                content: returnnode.node ? returnnode.node.value : null
            });
        }
        else if (returnnode.keystatus === 'key_not_found') {
            return makeReturnStatus({
                status: returnnode.keystatus,
                content: {
                    keyIndexReached: returnnode.keyIndexReached,
                    keysFound: keylist.slice(0, returnnode.keyIndexReached+1),
                    furthestNode: returnnode.node
                }
            });
        }

        return makeReturnStatus({ status: returnnode.keystatus });
    }

    hasValue(keylist:string[]): boolean {
        const node = APICache.traverse(keylist, this.cache);
        return node.keystatus === 'present' && !!node.node && node.node.valuestatus === 'present';
    };
    
    hasSubtree(keylist:string[]): boolean {
        const node = APICache.traverse(keylist, this.cache);
        return node.keystatus === 'present' && !!node.node && node.node.subtreestatus === 'present';
    };
    

    setValue(keylist:string[], value:any, valuestatus:string='present') {
        const node = APICache.traverse(keylist, this.cache, -1, true);
        if(node.node) {
            node.node.value = value;
            node.node.valuestatus = valuestatus;
        }
    }

    getSubtree(keylist:string[]): ReturnStatus {
        const node = APICache.traverse(keylist, this.cache);
        return makeReturnStatus({
            status: node.keystatus,
            content: node.node && node.node.subtree || null
        });
    };

    setSubtree(keylist:string[], subtree:CacheLevelType, subtreestatus:string='present') {
        const node = APICache.traverse(keylist, this.cache, -1, true);
        if(node.node) {
            node.node.subtree = subtree;
            node.node.subtreestatus = subtreestatus;
        }
    };

    getCleanedDict() {
        const recursivelyClean = (cacheLevel: CacheLevelType) => {
            let cleaned: { [key: string]: any } = {};
            for (const key in cacheLevel) {
                if (cacheLevel[key].valuestatus === 'present') {
                    cleaned[key] = { _value: cacheLevel[key].value };
                }
                if (cacheLevel[key].subtreestatus === 'present') {
                    cleaned[key] = { ...cleaned[key], ...recursivelyClean(cacheLevel[key].subtree) };
                }
            }
            return cleaned;
        }
        return recursivelyClean(this.cache);
    };

    dictToCacheTree(dict: any): CacheLevelType {
        const recursivelyBuild = (dictLevel: any): CacheLevelType => {
            let cacheLevel: CacheLevelType = {};
            for (const key in dictLevel) {
                if (key === '_value') continue;
                const node: Partial<CacheNodeType> = {};
                if ('_value' in dictLevel[key]) {
                    node.valuestatus = 'present';
                    node.value = dictLevel[key]._value;
                }
                const subtree = recursivelyBuild(dictLevel[key]);
                if (Object.keys(subtree).length > 0) {
                    node.subtreestatus = 'present';
                    node.subtree = subtree;
                }
                cacheLevel[key] = makeCacheNode(node);
            }
            return cacheLevel;
        }
        return recursivelyBuild(dict);
    };

    flush(keylist:string[], flushvalue=true) {
        const node = APICache.traverse(keylist, this.cache);
        if (node.node) {
            if (flushvalue) {
                node.node.valuestatus = 'none';
                node.node.value = null;
            }
            node.node.subtree = {};
            node.node.subtreestatus = 'empty';
        }
    };

    flushPending() {
        const recursivelyFlush = (cacheLevel: CacheLevelType) => {
            for (const key in cacheLevel) {
                if (cacheLevel[key].valuestatus !== 'present') {
                    cacheLevel[key].value = null;
                }
                if (cacheLevel[key].subtreestatus !== 'present') {
                    cacheLevel[key].subtree = {};
                } else {
                    recursivelyFlush(cacheLevel[key].subtree);
                }
            }
        }
        recursivelyFlush(this.cache);
    };
}
