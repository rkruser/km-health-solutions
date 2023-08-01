const API_QUERY_ADDRESS = null;

const queryAPIWithAddress = (command:string, arg:any) => {return "Error: API address not recognized"};

import { completeText } from './completion';
const queryAPIWithFunction = (command:string, arg:any) => {
    switch(command) {
        case "completeText":
            return completeText(arg);
        default:
            return "Error: API command not recognized";
    }
};

const queryAPI = API_QUERY_ADDRESS ? queryAPIWithAddress : queryAPIWithFunction;


async function getFakePatients(num:number) {
    let prompt = "Generate a list of " + num + " fictional hospital patients. Each patient should be given in the following format:\n\n[Last Name], [First Name]; [Date of Birth in MM/DD/YYYY]; [Short description of malady].\n\nFor example:\n\nDoe, John; 09/17/1953; Admitted for kidney failure.\n\nSeparate the patients with newlines.";
    let result = await queryAPI("completeText", prompt);
    return result.split("\n");
}

async function createFakeRecord(fakePatient:string) {
    let prompt = "Given a short description of a fictional patient, fill in a JSON object with hypothetical backstory and life details for that patient. The patient format is:\n\n[Last Name], [First Name]; [Date of Birth in MM/DD/YYYY]; [Short description of malady].\n\nThe JSON object should be structured as follows:\n\n {\n\"patientInfo\": {\n        \"firstName\": [First name],\n        \"lastName\": [Last name],\n       \"dateOfBirth\": [Date of birth],\n        \"overview\": [Brief description of symptoms/malady]\n      },\n      \"summary\": {\n         \"last24hours\":[Summary of patient's condition over last 24 hours],\n         \"lastWeek\": [Summary of condition over prior week],\n         \"lastYear\": [Summary of condition progress over last year],\n         \"all\": [Overall summary of patient's health]\n      },\n      \"orders\": {\n        \"date1 in MM/DD/YYYY\": [Doctor's order on date1],\n        \"date2\": [Doctor's order on date2],\n        ...\n      },\n      \"medications\": [\n          \"medication1\",\n          \"medication2\",\n          ...\n       ]\n    }\n\nPatient: " + fakePatient;
    let result = await queryAPI("completeText", prompt);
    return result;
}

async function generateFakePatients(num:number, callback:(fakePatients:string[])=>void) {
    let fakePatients = await getFakePatients(num);
    console.log(fakePatients);
    let fakeRecords = [];
    for (let fakePatient of fakePatients) {
        let fakeRecord = await createFakeRecord(fakePatient);
        console.log(fakeRecord);
        fakeRecords.push(fakeRecord);
    }
    callback(fakeRecords);
}

export { generateFakePatients };



