import * as _ from './patient_data_types';

declare module './patient_data_types' {
    export namespace Ampere {
        export interface BaseRecord {
            patientId: string;
            timestampAdded: Date; 
            timestampUpdated: Date;
        }

        export type RecordTypeToRecordIdList = {
            [key: string]: string[];
        }

        export interface GlobalRecord extends BaseRecord {
            mapping: RecordTypeToRecordIdList;
        }

        export type SourceType = {};

        export interface Record extends BaseRecord {
            recordId: string;
            recordType: string;
            timestampInfoCollected: Date | null; 
            recordSource: SourceType | null;
            notes: string | null;
            previousRecordId: string | null;
            nextRecordId: string | null;
        }
    }
}