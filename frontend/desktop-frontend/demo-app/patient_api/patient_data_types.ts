enum NameTitleEnum {
    MR = "Mr.",
    MRS = "Mrs.",
    MS = "Ms.",
    MX = "Mx.",
    DR = "Dr.",
    PROF = "Prof.",
    SIR = "Sir",
}

enum PronounSetEnum {
    MASCULINE = "he/him/his",
    FEMININE = "she/her/her",
    NEUTRAL = "they/them/their"
}

type NameType = {
    nameTitle: NameTitleEnum | null;
    namePrefix: string | null;
    firstName: string;
    middleName: string | null;
    lastName: string;
    preferredName: string | null;
    preferredPronouns: PronounSetEnum | string | null;
    maidenName: string | null;
    nameSuffix: string | null;
    nameNotes: string | null;
}


enum GenderIdentityEnum {
    MAN = "Man",
    WOMAN = "Woman",
    NONBINARY = "Nonbinary"
}

enum BirthSexIdentityEnum {
    MALE = "Male",
    FEMALE = "Female",
    INTERSEX = "Intersex"
}

enum LegalSexIdentityEnum {
    MALE = "Male",
    FEMALE = "Female",
    OTHER = "Other"
}

type GenderAndSexType = {
    genderIdentity : GenderIdentityEnum | null,
    birthSex : BirthSexIdentityEnum | null,
    legalSex : LegalSexIdentityEnum | null,
    notes: string | null;
}



type DateType = {
    year: Number,
    month: Number,
    day: Number
}

type AgeAndBirthdayInfoType = {
    age: Number,
    birthday: DateType
}


// Needs improvement
enum EthnicityEnum {
    WHITE = "White",
    BLACK = "Black",
    ASIAN = "Asian",
    NATIVE_AMERICAN = "Native American",
    PACIFIC_ISLANDER = "Pacific Islander",
    OTHER = "Other",
    UNKNOWN = "Unknown"
}

enum EthnicSubgroupEnum {
    ASIAN_INDIAN = "Asian Indian",
    /* and so on */
}

type EthnicityInfoType = {
    ethnicity : EthnicityEnum | null,
    subgroup: EthnicSubgroupEnum | string | null;
    isHispanic : Boolean | null,
    notes: string | null
}


type PhysicalInfoType = {
    heightInCentimeters : Number | null,
    weightInKilograms : Number | null,
    dateMeasured: DateType
}




enum NationalityEnum { }
type LegalInfoType = { 
    nationality: NationalityEnum
}
type ContactInfoType = { }
type InsuranceInfoType = { }
type PhysicianInfoType = { }
type MedicalOverviewType = {
    physicalInfo: PhysicalInfoType | null,
    /*
        One line overview description
        Summaries for different time periods
        Diagnoses
        Vaccinations
        Procedures
        Medications
        Notes
        etc.
    */
}


type PatientInfoType = {
    patientId: string, //Unique identifier for patient
    recordId: string, //Identifier for record (patient records can point at each other like a tree/graph structure, allowing full histories to be tracked)
    recordDate: DateType, //Date of current record (a patient is a collection of records under the same patientID)
    notes: string | null,
    nameInfo: NameType,
    genderInfo: GenderAndSexType | null,
    ageInfo: AgeAndBirthdayInfoType,
    ethnicityInfo: EthnicityInfoType | null,
    legalInfo: LegalInfoType | null,
    contactInfo: ContactInfoType | null,
    insuranceInfo: InsuranceInfoType | null,
    physicianInfo: PhysicalInfoType | null,
    medicalOverview: MedicalOverviewType
}



/*
To improve this file:
 - Use "interface ... extends" pattern
 - Possibly make everything extend the "Record" interface, whose mandatory fields are "uniqueId", "recordId", and "dateOfRecord". Maybe also "history"
 - Have classes/functions for creating patients and populating the info fields
 - Have functions for representing this interface to ChatGPT
*/