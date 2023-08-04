const fs = require('fs');
const { generateFakePatients } = require('./main_api');

// The first function: write a list of JSON objects to a file.
async function writeJSONToFile(jsonList: Array<Object>, filePath: string): Promise<void> {
    try {
        const data = JSON.stringify(jsonList);
        await fs.promises.writeFile(filePath, data);
        console.log('Successfully written data to file');
    } catch (error) {
        console.error(`Error while writing data to file: ${error}`);
    }
}

// The second function: read a file into a list of JSON objects.
async function readJSONFromFile(filePath: string): Promise<Array<Object>> {
    try {
        const data = await fs.promises.readFile(filePath, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        console.error(`Error while reading data from file: ${error}`);
        return [];
    }
}

async function generateFakePatientsAndWriteToFile(num: number, filePath: string): Promise<void> {
    await generateFakePatients(num).then((patients) => {
        writeJSONToFile(patients, filePath);
    });
}



type OrganizedPatientDataType = {
    firstNames: Array<string>,
    lastNames: Array<string>,
    records: Array<Record<string,object>>
};
type PatientType = {
    patientInfo: {
        firstName: string,
        lastName: string
    },
}
function processPatientData(patientData: Array<PatientType>): OrganizedPatientDataType {
    const firstNames: Array<string> = [];
    const lastNames: Array<string> = [];
    const records: Array<PatientType> = [];
    patientData.forEach((patient) => {
        firstNames.push(patient.patientInfo.firstName);
        lastNames.push(patient.patientInfo.lastName);
        records.push(patient);
    });
    return {firstNames: firstNames, lastNames: lastNames, records: records};
}


export { writeJSONToFile, 
    readJSONFromFile, 
    generateFakePatientsAndWriteToFile, 
    processPatientData,
    OrganizedPatientDataType,
};
