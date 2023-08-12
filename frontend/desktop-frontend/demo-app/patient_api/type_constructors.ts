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

const defaultBasicPatientInfoRecordPair: atypes.IdPair<atypes.BasicPatientInfoRecord> = ['', null];

const defaultAggregateInfo: atypes.AggregateInfo = {
    basicInfo: defaultBasicPatientInfoRecordPair,
    legalInfo: null,
    contactInfo: null,
    insuranceInfo: null,
    physicianInfo: null,
    medicalOverview: null,
};


/*
==============================================================================
Creation functions
==============================================================================
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
*/


/*
==============================================================================
FHIR bridging functions
==============================================================================
*/