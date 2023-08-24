import { FrontendAPI, ReturnedList } from "ampere_api/js/getter_and_setter_interface";
import { AggregateInfo } from "ampere_api/js/ampere_types";
import { createObjectOfType } from "ampere_api/js/type_constructors";
import remote from "./remote-bridge";

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

    async getCurrentPatientId(): Promise<string> {
        // Your implementation here
        return "some_patient_id"; // Just a dummy return for the example
    }

    async getPatientAggregateInfo(patientId: string, param: string): Promise<AggregateInfo> {
        // Your implementation here
        return createObjectOfType('AggregateInfo', {}); // Just a dummy return for the example
    }

    getOverallSummary(patientId: string, param: string): Promise<string> {
        // Your implementation here
        return new Promise((resolve,reject)=>{
            let isResolved = false;
            remote.bridge.on_receive('getOverallSummaryResponse', (event:any, ...args:any[]) => {
                console.log("Received getOverallSummaryResponse: " + args);
                isResolved = true;
                resolve(args[0]);
                remote.bridge.remove_listener('getOverallSummaryResponse');
            });

            remote.bridge.send('apiRequest', 'getOverallSummary', patientId, param);

            setTimeout(()=>{
                if (!isResolved) {
                    isResolved = true;
                    console.log("getOverallSummaryResponse timed out");
                    reject('timeout');
                    remote.bridge.remove_listener('getOverallSummaryResponse');
                }
            }, this.timeout);
        });
    }

    async getOrderSummary(patientId: string, param: string): Promise<string> {
        // Your implementation here
        return "some_order_summary";
    }

    async getMedicationSummary(patientId: string, param: string): Promise<string> {
        // Your implementation here
        return "some_medication_summary";
    }

    async getBasicInfo(patientId: string, param: string): Promise<string> {
        // Your implementation here
        return "some_basic_info";
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
