import { FrontendAPI, ReturnedList } from "ampere_api/js/getter_and_setter_interface";
import { AggregateInfo } from "ampere_api/js/ampere_types";
import { createObjectOfType } from "ampere_api/js/type_constructors";
import remote from "./remote-bridge";
import { response } from "express";

function createAPIPromise(apiChannel:string, timeout:number, ...rest:any[]): Promise<string> {
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
        return createAPIPromise('getCurrentPatientId', this.timeout); // Just a dummy return for the example
    }

    getPatientAggregateInfo(patientId: string, param: string): Promise<AggregateInfo> {
        // Your implementation here
        return createObjectOfType('AggregateInfo', {}); // Just a dummy return for the example
    }

    getOverallSummary(patientId: string, param: string): Promise<string> {
        // Your implementation here
        return createAPIPromise('getOverallSummary', this.timeout, patientId, param);
    }

    getOrderSummary(patientId: string, param: string): Promise<string> {
        // Your implementation here
        return createAPIPromise('getOrderSummary', this.timeout,  patientId, param);
    }

    getMedicationSummary(patientId: string, param: string): Promise<string> {
        // Your implementation here
        return createAPIPromise('getMedicationSummary', this.timeout, patientId, param);
    }

    getBasicInfo(patientId: string, param: string): Promise<string> {
        // Your implementation here
        return createAPIPromise('getBasicInfo', this.timeout,  patientId, param);
    }

    setCurrentPatientId(patientId: string): Promise<void> {
        return new Promise((resolve,reject)=>{
            /* Do remote bridge stuff here and listen for response */
            let isResolved = false;
            remote.bridge.on_receive('setCurrentPatientIdResponse', (event:any, ...args:any[]) => {
                console.log("Received setCurrentPatientIdResponse: " + args);
                isResolved = true;
                this.setPatientIdState(patientId);
                resolve();
                remote.bridge.remove_listener('setCurrentPatientIdResponse');
            });

            remote.bridge.send('apiRequest', 'setCurrentPatientId', patientId);

            setTimeout(()=>{
                if (!isResolved) {
                    isResolved = true;
                    console.log("setCurrentPatientIdResponse timed out");
                    reject('timeout');
                    remote.bridge.remove_listener('setCurrentPatientIdResponse');
                }
            }, this.timeout);

            this.setPatientIdState(patientId);
            resolve();
        });
    }

    async setCurrentPatientAggregateInfo(info: AggregateInfo): Promise<void> {
        // Your implementation here
    }

    async setSearchState(param: string): Promise<void> {
        // Your implementation here
    }
}

export default RendererAPIService;
