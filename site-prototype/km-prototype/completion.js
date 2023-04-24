const { Configuration, OpenAIApi } = require('openai');

async function completeText(prompt) {
    // TODO: Make the API key more secure by doing a server side call with the API key as local file / env variable
    //const API_KEY = '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';
    const API_KEY = process.env.OPENAI_API_KEY;
    const configuration = new Configuration({
        apiKey: API_KEY,
      }); 
      const openai = new OpenAIApi(configuration);

    try {
        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{"role": "user", "content": prompt}],
            temperature: 0.7,
          });
  
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        return response.data.choices[0].message.content;
      } else {
        throw new Error('No completion found');
      }
    } catch (error) {
      console.error('Error completing text:', error);
      return "Error: could not access chatGPT";
    }
  }


const exportedFuncs = {
    completeText,
  };

module.exports = exportedFuncs;
  
