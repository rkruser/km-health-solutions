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

    //Todo:
    // Add a force_create option to create nonexistent keys
    // move returnval stuff to a creator function for better maintenance
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
                    subtreestatus: 'present', //put 'empty' here instead?
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
            node: prevNode,
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



    hasValue(keylist:string[]){

    };
    hasSubtree(keylist:string[]){
        
    };
    setValue(keylist:string[], value:string, status:string) {
        //this.cache[key] = value;
    }

    getSubtree(){

    };
    setSubtree(){

    };
    getCleanedDict() {

    };
    dictToSubtree() {

    };


    flush(keylist:string[]) {
        
    };
    flushPending(){

    };
}