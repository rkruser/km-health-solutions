import { FrontendAPI, ReturnedList } from "ampere_api/js/getter_and_setter_interface";
import { AggregateInfo } from "ampere_api/js/ampere_types";
import { createObjectOfType } from "ampere_api/js/type_constructors";

export class MainAPIService implements FrontendAPI {
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
        return "some_patient_id"+"_"+Math.random().toString(); // Just a dummy return for the example
    }

    async getPatientAggregateInfo(patientId: string, param: string): Promise<AggregateInfo> {
        // Your implementation here
        return createObjectOfType('AggregateInfo', {}); // Just a dummy return for the example
    }

    async getOverallSummary(patientId: string, param: string): Promise<string> {
        // Your implementation here
        return "LEM_summary_"+param+"_"+Math.random().toString();
    }

    async getOrderSummary(patientId: string, param: string): Promise<string> {
        // Your implementation here
        return "some_order_summary"+"_"+Math.random().toString();
    }

    async getMedicationSummary(patientId: string, param: string): Promise<string> {
        // Your implementation here
        return "some_medication_summary"+"_"+Math.random().toString();
    }

    async getBasicInfo(patientId: string, param: string): Promise<string> {
        // Your implementation here
        return "some_basic_info"+"_"+Math.random().toString();
    }

    async setCurrentPatientId(patientId: string): Promise<void> {
        // Your implementation here
    }

    async setCurrentPatientAggregateInfo(info: AggregateInfo): Promise<void> {
        // Your implementation here
    }

    async setSearchState(param: string): Promise<void> {
        // Your implementation here
    }
}
