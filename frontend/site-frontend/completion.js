async function generateData(prompt) {
  try {
    const response = await fetch('http://127.0.0.1:5000/generate-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      throw new Error('Error completing text');
    }

    const data = await response.json();
    console.log(data);

    return data.processed_data;
  } catch (error) {
    console.error('Error completing text:', error);
    return 'Error: could not access chatGPT';
  }
}


const exportedFuncs = {
    generateData,
  };

module.exports = exportedFuncs;
  
