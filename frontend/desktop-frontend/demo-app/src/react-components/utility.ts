import exp from "constants";

function getTestPatient() {
    const testPatient = {
        "info": {name: "Test patient", dob: "3-19-1994", description: "The developer"},
        "summary": "summary text",
        "orders": "orders text",
        "medications": "medications text",
        "timeline": "timeline text",
        "history": "history text",
        "labs": "labs text",
        "vitals": "vitals text",
        "notes": "notes text",
        "recommendations": "recommendations text",
        "diagnoses": "diagnoses text",
        "allergies": "allergies text",
    }
    
    return testPatient;
}


function getRandomInteger(min: number, max: number) {
    min = Math.ceil(min); // Round up to the nearest whole number
    max = Math.floor(max); // Round down to the nearest whole number
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

export { getTestPatient, getRandomInteger };