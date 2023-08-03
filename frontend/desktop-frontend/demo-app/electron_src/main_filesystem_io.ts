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

export { writeJSONToFile, readJSONFromFile, generateFakePatientsAndWriteToFile };
