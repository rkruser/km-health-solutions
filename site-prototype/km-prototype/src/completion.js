/*
const axios = require('axios');

async function completeText(prompt) {
  const API_KEY = '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';

  const data = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${API_KEY}`,
    model: 'gpt-3.5-turbo', // Replace with your desired model
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
    temperature: 0.7,
  };

  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.openai.com/v1/chat/completions',
      data: data
    }
    );

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content;
    } else {
      throw new Error('No completion found');
    }
  } catch (error) {
    console.error('Error completing text:', error);
    return null;
  }
}
*/

import { Configuration, OpenAIApi } from "openai";

async function completeText(prompt) {
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
      return null;
    }
  }


const exportedFuncs = {
    completeText,
  };

export default exportedFuncs;
  
