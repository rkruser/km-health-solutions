import { DEFAULTS, createObjectOfType } from "../type_constructors";

const newname = {
    firstName: "John",
    lastName: "Doe",
}

const nameObject = createObjectOfType('NameType', newname);
console.log("Name Object")
console.log(nameObject);


const emptyAggregateInfo = createObjectOfType('AggregateInfoType', {});
console.log("Empty Aggregate Info");
console.log(emptyAggregateInfo);


const basicInfo = createObjectOfType('BasicPatientInfoRecord', {nameInfo: nameObject});
console.log("Basic Info");
console.log(basicInfo);


const aggregateInfo = createObjectOfType('AggregateInfoType', {basicInfo: basicInfo});
console.log("Aggregate Info");
console.log(Object.keys(aggregateInfo));
console.log(aggregateInfo);
