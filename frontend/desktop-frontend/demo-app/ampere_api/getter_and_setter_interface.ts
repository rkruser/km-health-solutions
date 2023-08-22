import { AggregateInfo } from "./ampere_types";

export type ListEntry = {
    id: string;
    name: string;
    birthdate: string;
    description: string|null;
}
export type ReturnedList = Array<ListEntry>;

export interface FrontendAPI {
    getPatientList(patientId:string, param:string): Promise<ReturnedList>;
    getSearchResults(patientId:string, param:string): Promise<ReturnedList>;
    getCurrentPatientId(): Promise<string>;
    getPatientAggregateInfo(patientId:string, param:string): Promise<AggregateInfo>; //unclear if this is needed; mainly for caching
    getOverallSummary(patientId:string, param:string): Promise<string>;
    getOrderSummary(patientId:string, param:string): Promise<string>;
    getMedicationSummary(patientId:string, param:string): Promise<string>;
    getBasicInfo(patientId:string, param:string): Promise<string>;

    setCurrentPatientId(patientId:string): Promise<void>;
    setCurrentPatientAggregateInfo(info:AggregateInfo): Promise<void>; //unclear if this is needed; mainly for caching
    setSearchState(param:string): Promise<void>;
}