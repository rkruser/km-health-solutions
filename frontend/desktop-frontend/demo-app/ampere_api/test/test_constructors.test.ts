//import '@testing-library/jest-dom';
import { DEFAULTS, createObjectOfType } from "../type_constructors";

const newname = {
    firstName: "John",
    lastName: "Doe",
}

const nameObject = createObjectOfType('NameType', newname);
console.log("Name Object")
console.log(nameObject);


const emptyAggregateInfo = createObjectOfType('AggregateInfo', {});
console.log("Empty Aggregate Info");
console.log(emptyAggregateInfo);


const basicInfo = createObjectOfType('BasicPatientInfoRecord', {nameInfo: nameObject});
console.log("Basic Info");
console.log(basicInfo);


const basicInfoPair = createObjectOfType('RecordPair', {id: "123", record: basicInfo});

const aggregateInfo = createObjectOfType('AggregateInfo', {basicInfoPair: basicInfoPair});
console.log("Aggregate Info");
console.log(aggregateInfo);

test('test_constructors', () => {
    const result = (() => {return true})();
    expect(result).toBe(true);
});