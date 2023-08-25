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


class APICache {
    private cache: CacheLevelType;

    constructor() {
        this.cache = {};
    }

    static traverse(keylist:string[], 
                    cacheLevel:CacheLevelType, 
                    prevKeyIndex:number=-1, 
                    force_create:boolean=false,
                    prevNode:CacheNodeType|null=null) {
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
            else if (force_create) {
                let cacheNode:CacheNodeType = {
                    valuestatus: 'none',
                    valuetimestamp: 'na',
                    value: null,
                    subtreestatus: 'empty',
                    subtreetimestamp: 'na',
                    subtree: {}
                }
                cacheLevel[key] = cacheNode;
                let returnval:ReturnKeyStatus = {
                    keystatus: 'present',
                    node: cacheNode,
                    keyIndexReached: prevKeyIndex+1
                }
                return returnval;
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
                let cacheNode:CacheNodeType = {
                    valuestatus: 'none',
                    valuetimestamp: 'na',
                    value: null,
                    subtreestatus: 'present',
                    subtreetimestamp: 'na',
                    subtree: {}
                }
                cacheLevel[key] = cacheNode;
                return APICache.traverse(rest, 
                    cacheNode.subtree, 
                    prevKeyIndex+1, 
                    force_create,
                    cacheNode);
            }
        }

        let returnval:ReturnKeyStatus = {
            keystatus: 'key_not_found',
            node: prevNode, // The furthest node found on the key path
            keyIndexReached: prevKeyIndex
        }
        return returnval;
    }

    getValue(keylist:string[]) {
        let returnnode:ReturnKeyStatus = APICache.traverse(keylist, this.cache);
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
                    keysFound: keylist.slice(0,returnnode.keyIndexReached+1),
                    furthestNode: returnnode.node
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


    // True if key path exists and value is "present"
    hasValue(keylist:string[]): boolean {

    };
    // True if subtree exists and value is "present"
    hasSubtree(keylist:string[]): boolean {
        
    };

    /*
    Set the value of the node given by the keylist to the given value.
    Set the valuestatus to the given status.
    Create any intermediate nodes necessary.
    If any nodes are added to an empty subtree, change the subtree status from 'empty'
      to 'present'
    */
    setValue(keylist:string[], value:any, valuestatus:string) {
        
    }

    getSubtree(keylist:string[]): ReturnStatus {

    };

    /*
    Like setValue but for the subtree.
    */
    setSubtree(keylist:string[], subtree:CacheLevelType, subtreestatus) {

    };

    /* 
    Make this.cache into a normal hierarchical dictionary for all the existing keys.
    Ignore values and subtrees that do not have a status of 'present'.
    If a keylist has both a present value and subtree, the returned dict should
      map that keypath to a (cleaned) dictionary for the subtree with an additional
      '_value' key mapped to the value.
    */
    getCleanedDict() {

    };

    /*
    Reverse the getCleanedDict operation to get a cache structure.
    */
    dictToCacheTree() {

    };

    /*
    Erase the subtree given by the keylist, if it exists. Optionally
      erase the value at that node.
    */
    flush(keylist:string[], flushvalue=true) {
        
    };

    /*
    Erase all elements (both value and subtree) of the cache whose status is not 'present'
    */
    flushPending(){

    };
}