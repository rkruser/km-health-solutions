import * as atypes from './ampere_types';

/* 
==============================================================================
Default Objects 
==============================================================================
*/

const defaultNameType: atypes.NameType = {
    nameTitle: null,
    namePrefix: null,
    firstName: '',
    middleName: null,
    lastName: '',
    preferredName: null,
    preferredPronouns: null,
    maidenName: null,
    nameSuffix: null,
    nameNotes: null,
};

const defaultGenderAndSexType: atypes.GenderAndSexType = {
    genderIdentity: null,
    birthSex: null,
    legalSex: null,
    notes: null,
};

const defaultDateType: atypes.DateType = {
    year: 0,
    month: 0,
    day: 0,
};

const defaultEthnicityInfoType: atypes.EthnicityInfoType = {
    ethnicity: null,
    subgroup: null,
    isHispanic: null,
    notes: null,
};

const defaultPhysicalInfoType: atypes.PhysicalInfoType = {
    heightInCentimeters: null,
    weightInKilograms: null,
    dateMeasured: defaultDateType,
};

// Since no fields or details are provided for the following types, they are initialized as empty objects. 
// This is just a placeholder. 
const defaultLegalInfoType: atypes.LegalInfoType = { 
    nationality: {} as atypes.NationalityEnum
};
const defaultContactInfoType: atypes.ContactInfoType = {};
const defaultInsuranceInfoType: atypes.InsuranceInfoType = {};
const defaultPhysicianInfoType: atypes.PhysicianInfoType = {};

const defaultMedicalOverviewType: atypes.MedicalOverviewType = {
    physicalInfo: null
};

const defaultPatientInfoType: atypes.PatientInfoType = {
    nameInfo: defaultNameType,
    genderInfo: null,
    birthday: null,
    ethnicityInfo: null,
    legalInfo: null,
    contactInfo: null,
    insuranceInfo: null,
    physicianInfo: null,
    medicalOverview: defaultMedicalOverviewType,
};

// Default for enum: RecordTypeEnum
const defaultRecordTypeEnum = atypes.RecordTypeEnum.GLOBAL_PATIENT;

const defaultBaseRecord: atypes.BaseRecord = {
    uniqueId: '',
    isPatient: false,
    recordType: defaultRecordTypeEnum,
    timestampAdded: new Date(),
    timestampUpdated: new Date(),
};

const defaultRecordTypeToRecordIdList: atypes.RecordTypeToRecordIdList = {};

const defaultGlobalRecord: atypes.GlobalRecord = {
    ...defaultBaseRecord,
    mapping: defaultRecordTypeToRecordIdList,
};

const defaultSourceType: atypes.SourceType = {
    practitionerId: null,
    institutionId: null,
    aiId: null,
    queryParams: null,
    resourceId: null,
    notes: null,
};

// Default for enum: InfoTypeEnum
const defaultInfoTypeEnum = atypes.InfoTypeEnum.BASIC_INFO;

const defaultDataRecord: atypes.DataRecord = {
    ...defaultBaseRecord,
    recordId: '',
    infoType: defaultInfoTypeEnum,
    timestampInfoCollected: null,
    recordSource: defaultSourceType,
    notes: null,
    extension: {},
    previousRecordId: null,
    nextRecordId: null,
};

const defaultBasicPatientInfoRecord: atypes.BasicPatientInfoRecord = {
    ...defaultDataRecord,
    nameInfo: defaultNameType,
    genderInfo: null,
    birthday: null,
    ethnicityInfo: null,
};

const defaultRecordPair: atypes.RecordPair<atypes.BasicPatientInfoRecord> = {id: null, record:null};

const defaultAggregateInfo: atypes.AggregateInfo = {
    basicInfoPair: defaultRecordPair,
    legalInfoPair: null,
    contactInfoPair: null,
    insuranceInfoPair: null,
    physicianInfoPair: null,
    medicalOverviewPair: null,
};



export const DEFAULTS: {[key:string]: any} = {
    /* Types */
    NameType: defaultNameType,
    GenderAndSexType: defaultGenderAndSexType,
    DateType: defaultDateType,
    EthnicityInfoType: defaultEthnicityInfoType,
    PhysicalInfoType: defaultPhysicalInfoType,
    LegalInfoType: defaultLegalInfoType,
    ContactInfoType: defaultContactInfoType,
    InsuranceInfoType: defaultInsuranceInfoType,
    PhysicianInfoType: defaultPhysicianInfoType,
    MedicalOverviewType: defaultMedicalOverviewType,
    PatientInfoType: defaultPatientInfoType,
    /* Interfaces */
    BaseRecord: defaultBaseRecord,
    RecordTypeToRecordIdList: defaultRecordTypeToRecordIdList,
    GlobalRecord: defaultGlobalRecord,
    SourceType: defaultSourceType,
    DataRecord: defaultDataRecord,
    BasicPatientInfoRecord: defaultBasicPatientInfoRecord,
    RecordPair: defaultRecordPair,
    AggregateInfo: defaultAggregateInfo,
};

type DefaultKeys = keyof typeof DEFAULTS;


/*
==============================================================================
Creation functions
==============================================================================
*/


function applyDefault<T extends Object>(defaultObject: T, overrideObject: Partial<T>): T {
    // Initialize an empty result object
    const result: Partial<T> = {};

    for (const key in overrideObject) {
        if ( Object.prototype.hasOwnProperty.call(overrideObject, key) &&  // Can change to Object.keys(...).forEach(...)
            !Object.prototype.hasOwnProperty.call(defaultObject, key) ) {
            throw new Error(`Invalid key "${key}" in overrideObject.`);
        }
    }

    for (const key in defaultObject) {
        // This 'if' checks if the key is a direct property of the object instead of an inherited property through prototype chain
        // This is for safety of behavior; things could get messy and unpredictable otherwise
        if ( Object.prototype.hasOwnProperty.call(defaultObject, key) ) {
            if (
                typeof defaultObject[key] === 'object' &&
                defaultObject[key] !== null &&
                !Array.isArray(defaultObject[key])
            ) {
                result[key] = applyDefault(
                    defaultObject[key] as any,
                    overrideObject[key] !== undefined ? overrideObject[key] as any : {}
                );
            } else {
                result[key] = key in overrideObject ? overrideObject[key] : defaultObject[key];
            }
        }
    }

    return result as T;
}


export function createObjectOfType<T extends DefaultKeys>(type: T, overrideObject: Partial<typeof DEFAULTS[T]>): typeof DEFAULTS[T] {
    if (!(type in DEFAULTS)) {
        throw new Error(`${type} is not a valid key of DEFAULTS.`);
    }

    return applyDefault(DEFAULTS[type], overrideObject);
}


/*
// Usage
const result = applyDefault(defaultNameType, {
    firstName: "John"
});
console.log(result);


Now, to further streamline your types and default creation:

    Create a dictionary (or an object in JavaScript terms) of all default objects.
    Create a function that, given a type key, will return the associated default object.

This way, you won't need to create a separate creation function for each type. The function applyDefault will take care of all types, given the correct default object and override object.


const DEFAULTS = {
    NameType: defaultNameType,
    GenderAndSexType: defaultGenderAndSexType,
    DateType: defaultDateType,
    // ... add all defaults here
};

type DefaultKeys = keyof typeof DEFAULTS;



// Usage
const name = createObjectOfType('NameType', {
    firstName: "John"
});
console.log(name);

*/





/*
==============================================================================
Formatting functions for printing
==============================================================================
*/

/*
==============================================================================
Formatting functions for AI printing
==============================================================================

- Have different formatting options, such as "basic info only", "orders last week", etc.
- Have the option to make server calls to obtain missing data, or just try to work around missing data, etc.
- Abstract away where the data is in the database/server ecosystem
- Eventually some kind of summary tree function
- Need to write an official API spec
*/


/*
==============================================================================
FHIR bridging functions
==============================================================================

- Getting list of patients
- Getting list of upcoming appointments
- Getting list of inpatients
- For a given patient, get all their EHR records, their entire history
- Need a way to intake all of this information and convert it to the above interface
*/
