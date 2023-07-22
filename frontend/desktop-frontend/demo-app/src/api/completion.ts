const { Configuration, OpenAIApi } = require('openai'); //I do not understand why this file needs to be commonJS

export async function completeText(prompt:string) {
    const API_KEY = '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';
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

