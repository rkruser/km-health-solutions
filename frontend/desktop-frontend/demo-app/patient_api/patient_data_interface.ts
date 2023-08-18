import * as atypes from './patient_data_types';

export enum RecordTypeEnum {
    GLOBAL_PATIENT = "global",
    LOCAL_PATIENT = "local",
    PRACTITIONER = 'practitioner',
    INSTITUTION = 'institution',
    RESOURCE = 'resource'
}

export interface BaseRecord {
    uniqueId: string;
    isPatient: Boolean;
    recordType: RecordTypeEnum;
    timestampAdded: Date;
    timestampUpdated: Date;
}

export type RecordTypeToRecordIdList = {
    [key: string]: string[]; //InfoTypeEnum as key?
}

export interface GlobalRecord extends BaseRecord {
    mapping: RecordTypeToRecordIdList;
}

export type SourceType = {
    practitionerId: string|null;
    institutionId: string|null;
    aiId: string|null;
    queryParams: string|null; //params for the AI query?
    resourceId: string|null;
    notes: string|null;
};

export enum InfoTypeEnum {
    BASIC_INFO = "basic", //name, birthday, gender, ethnicity
    PHYSICAL_INFO = "physical", //height, weight, etc.
    CONTACT_INFO = "contact",
    LEGAL_INFO = "legal",
    INSURANCE_INFO = "insurance",
    PRACTITIONER_INFO = "practitioner",
    LAB_INFO = "lab",
    APPOINTMENT_INFO = "appointment",
    MEDICATION_INFO = "medication",
    MEDICAL_NOTE = "note",
    MEDICAL_ORDER = "order",
    MEDICAL_DIAGNOSIS = "diagnosis",
    MEDICAL_PROCEDURE = "procedure",
    SUMMARY_RECORD = "summary",
    RECOMMENDATION_RECORD = "recommendation",
    KNOWLEDGE_ASSIST_RECORD = "further information",
    OTHER = "other",
}

export interface DataRecord extends BaseRecord {
    recordId: string; //should this be patient ID and BaseRecord contain recordID?
    infoType: InfoTypeEnum;
    timestampInfoCollected: Date | null; 
    recordSource: SourceType | null;
    notes: string | null;
    extension: any; //For extending the interface
    previousRecordId: string | null;
    nextRecordId: string | null;
}


export interface BasicPatientInfoRecord extends DataRecord {
    nameInfo: atypes.NameType;
    genderInfo: atypes.GenderAndSexType | null;
    birthday: atypes.DateType | null;
    ethnicityInfo: atypes.EthnicityInfoType | null;
}


export type RecordPair<T> = {
    id: string|null;
    record: T|null;
}; //pair of record ID and an object of that type, or null

//Aggregated info to be displayed by frontend. Includes only some patient info, such as recent history
export interface AggregateInfo {
    basicInfoPair: RecordPair<BasicPatientInfoRecord>;
    legalInfoPair: RecordPair<atypes.LegalInfoType>|null, //change types to record interfaces?
    contactInfoPair: RecordPair<atypes.ContactInfoType>|null,
    insuranceInfoPair: RecordPair<atypes.InsuranceInfoType>|null,
    physicianInfoPair: RecordPair<atypes.PhysicalInfoType>|null,
    medicalOverviewPair: RecordPair<atypes.MedicalOverviewType>|null,
    /* Have pointers to everything, cache, etc. */
}


/*

App may need to:
- Store info about the practioners using the specific instance of the app, the institution it's in, the location, etc.
- Support different languages (eventually)
- Translate (eventually)




*/