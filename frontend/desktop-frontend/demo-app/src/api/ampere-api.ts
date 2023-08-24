import { FrontendAPI, ReturnedList } from "ampere_api/js/getter_and_setter_interface";
import { AggregateInfo } from "ampere_api/js/ampere_types";
import { createObjectOfType } from "ampere_api/js/type_constructors";
import remote from "./remote-bridge";
import { response } from "express";
import { update } from "lodash";


async function appendStringWithRandomInt(input: string): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const randomInt: number = Math.floor(Math.random() * 100);
        resolve(`${input}_${randomInt}`);
      }, 2000);
    });
  }

/*
To do next:
hierarchical model
{
    "patientId1": {
        status: "loading"|"Loaded"|"Error",
        timestamp: 123456789,
        value: {...}; //have a subobject just for chat history regarding this patient?
    }
    "patientId2": {
        ...
    }

}

*/

export class testAPIModel {
    private cache: any;
    constructor() {
        this.cache = {};
    }
    obtain(key:string, notifierVar:number, setNotifierVar:(arg:number)=>void) : string {
        if (key in this.cache) {
            return this.cache[key];
        } else {
            let tempVal = 'placeholder';
            this.cache[key] = tempVal;
            appendStringWithRandomInt(key).then((result) => {
                this.cache[key] = result;
                setNotifierVar(notifierVar+1);
            });
            return tempVal;
        }
    }
}


function createGetterPromise(apiChannel:string, timeout:number, ...rest:any[]): Promise<string> {
    return new Promise((resolve,reject)=>{
        let isResolved = false;
        let responseChannel = apiChannel + 'Response';
        remote.bridge.on_receive(responseChannel, (event:any, ...args:any[]) => {
            console.log("Received " + responseChannel + ": " + args);
            isResolved = true;
            resolve(args[0]);
            remote.bridge.remove_listener(responseChannel);
        });

        remote.bridge.send('apiRequest', apiChannel, ...rest);

        setTimeout(()=>{
            if (!isResolved) {
                isResolved = true;
                console.log(responseChannel + " timed out");
                reject('timeout');
                remote.bridge.remove_listener(responseChannel);
            }
        }, timeout);
    });
}

function createSetterPromise(timeout:number, apiChannel:string, updateFunc:(a:any[],b:any[])=>void, ...rest:any[]) : Promise<void> {
    return new Promise((resolve,reject)=>{
        /* Do remote bridge stuff here and listen for response */
        let isResolved = false;
        let responseChannel = apiChannel + 'Response';
        remote.bridge.on_receive(responseChannel, (event:any, ...args:any[]) => {
            console.log("Received " + responseChannel + ": " + args);
            isResolved = true;
            updateFunc(args, rest);
            resolve();
            remote.bridge.remove_listener(responseChannel);
        });

        remote.bridge.send('apiRequest', apiChannel, ...rest);

        setTimeout(()=>{
            if (!isResolved) {
                isResolved = true;
                console.log(responseChannel + " timed out");
                reject('timeout');
                remote.bridge.remove_listener(responseChannel);
            }
        }, timeout);
    });
}

class RendererAPIService implements FrontendAPI {
    private setPatientIdState: (arg:string)=>void;
    private timeout: number;

    constructor(setPatientIdState: (arg:string)=>void, timeout=5000) {
        this.setPatientIdState = setPatientIdState;
        this.timeout = timeout;
    }

    async getPatientList(patientId: string, param: string): Promise<ReturnedList> {
        // Your implementation here
        return []; // Just a dummy return for the example
    }

    async getSearchResults(patientId: string, param: string): Promise<ReturnedList> {
        // Your implementation here
        return [];
    }

    getCurrentPatientId(): Promise<string> {
        // Your implementation here
        return createGetterPromise('getCurrentPatientId', this.timeout); // Just a dummy return for the example
    }

    getPatientAggregateInfo(patientId: string, param: string): Promise<AggregateInfo> {
        // Your implementation here
        return createObjectOfType('AggregateInfo', {}); // Just a dummy return for the example
    }

    getOverallSummary(patientId: string, param: string): Promise<string> {
        // Your implementation here
        return createGetterPromise('getOverallSummary', this.timeout, patientId, param);
    }

    getOrderSummary(patientId: string, param: string): Promise<string> {
        // Your implementation here
        return createGetterPromise('getOrderSummary', this.timeout,  patientId, param);
    }

    getMedicationSummary(patientId: string, param: string): Promise<string> {
        // Your implementation here
        return createGetterPromise('getMedicationSummary', this.timeout, patientId, param);
    }

    getBasicInfo(patientId: string, param: string): Promise<string> {
        // Your implementation here
        return createGetterPromise('getBasicInfo', this.timeout,  patientId, param);
    }

    setCurrentPatientId(patientId: string): Promise<void> {
        return createSetterPromise(this.timeout, 
            'setCurrentPatientId', 
            (_:any[], rest:any[]) => this.setPatientIdState(rest[0]), 
            patientId);
    }

    /*
    async setCurrentPatientAggregateInfo(dummy:string, info: AggregateInfo): Promise<void> {
        // Your implementation here
    }
    */

    async setSearchState(param: string): Promise<void> {
        // Your implementation here
    }
}

export default RendererAPIService;
