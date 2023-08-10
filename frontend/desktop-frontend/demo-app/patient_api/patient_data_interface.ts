import * as _ from './patient_data_types';

declare module './patient_data_types' {
    export namespace Ampere {
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
            [key: string]: string[];
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

        export interface Record extends BaseRecord {
            recordId: string;
            infoType: InfoTypeEnum;
            timestampInfoCollected: Date | null; 
            recordSource: SourceType | null;
            notes: string | null;
            extension: any; //For extending the interface
            previousRecordId: string | null;
            nextRecordId: string | null;
        }


        export interface BasicPatientInfoRecord extends Record {
            nameInfo: NameType;
            genderInfo: GenderAndSexType | null;
            birthday: DateType | null;
            ethnicityInfo: EthnicityInfoType | null;
        }


        type IdPair<T> = [string|null, T|null]; //pair of record ID and an object of that type, or null

        //Aggregated info to be displayed by frontend. Includes only some patient info, such as recent history
        export interface AggregateInfo {
            basicInfo: IdPair<BasicPatientInfoRecord>;
            legalInfo: IdPair<LegalInfoType>, //change types to record interfaces?
            contactInfo: IdPair<ContactInfoType>,
            insuranceInfo: IdPair<InsuranceInfoType>,
            physicianInfo: IdPair<PhysicalInfoType>,
            medicalOverview: IdPair<MedicalOverviewType>,
            /* Have pointers to everything, cache, etc. */
        }

    }
}

/*

App may need to:
- Store info about the practioners using the specific instance of the app, the institution it's in, the location, etc.
- Support different languages (eventually)
- Translate (eventually)




*/