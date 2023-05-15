# app.py


'''
This server does the following:
1. Take queries involving patient notes from the frontend server
2. Internally query the necessary AI models and medical databases, and perform various checks
3. Return the results of the queries

This server is the only one that interacts with the API keys.

To use the openai python package:

// setup imports
import os
import openai
openai.organization = "org-UUl6Hk5QnLegiYwxHcCBjTtw" //? Not necessary for me, I think
openai.api_key = os.getenv("OPENAI_API_KEY") //source this into the environment in a script beforehand

// get list of available models
model_list = openai.Model.list()

// main completions code
prompt_text = "YOUR TEXT HERE"
response = openai.ChatCompletion.create(
  model="gpt-4",
  messages= [{"role":"user", "content":prompt_text}],
  max_tokens=15, //or whatever
  temperature = 0.5, //or whatever
)


Messages can contain message history, with the following roles:
system: instructions for how to behave
assistant: following the instructions and responding to user
user: human input

# To list models:
model_list = openai.Model.list()
print(model_list)




Important reference: https://platform.openai.com/docs/api-reference/chat/create
Other reference: https://github.com/openai/openai-cookbook/blob/main/examples/How_to_count_tokens_with_tiktoken.ipynb
https://github.com/openai/openai-cookbook/blob/main/examples/How_to_stream_completions.ipynb
https://developer.mozilla.org/en-US/docs/Web/API/Server-sent_events/Using_server-sent_events#event_stream_format

'''

import os
import openai

with open('.env', 'r') as file:
    openai.api_key = file.read()


import tiktoken # openAI's token counting utility




def num_tokens_from_messages(messages, model="gpt-3.5-turbo-0301"):
    """Returns the number of tokens used by a list of messages."""
    try:
        encoding = tiktoken.encoding_for_model(model)
    except KeyError:
        print("Warning: model not found. Using cl100k_base encoding.")
        encoding = tiktoken.get_encoding("cl100k_base")
    if model == "gpt-3.5-turbo":
        print("Warning: gpt-3.5-turbo may change over time. Returning num tokens assuming gpt-3.5-turbo-0301.")
        return num_tokens_from_messages(messages, model="gpt-3.5-turbo-0301")
    elif model == "gpt-4":
        print("Warning: gpt-4 may change over time. Returning num tokens assuming gpt-4-0314.")
        return num_tokens_from_messages(messages, model="gpt-4-0314")
    elif model == "gpt-3.5-turbo-0301":
        tokens_per_message = 4  # every message follows <|start|>{role/name}\n{content}<|end|>\n
        tokens_per_name = -1  # if there's a name, the role is omitted
    elif model == "gpt-4-0314":
        tokens_per_message = 3
        tokens_per_name = 1
    else:
        raise NotImplementedError(f"""num_tokens_from_messages() is not implemented for model {model}. See https://github.com/openai/openai-python/blob/main/chatml.md for information on how messages are converted to tokens.""")
    num_tokens = 0
    for message in messages:
        num_tokens += tokens_per_message
        for key, value in message.items():
            num_tokens += len(encoding.encode(value))
            if key == "name":
                num_tokens += tokens_per_name
    num_tokens += 3  # every reply is primed with <|start|>assistant<|message|>
    return num_tokens





prompt_text = "Write a one paragraph short story about a spider and a puppy who are friends."
messages=[{"role":"user", "content":prompt_text}]
print("Num tokens for prompt:", num_tokens_from_messages(messages))
response = openai.ChatCompletion.create(
  model="gpt-3.5-turbo",
  messages=messages,
  temperature=0.0,
  #max_tokens=25,
  #n=1
  #stream=True,
)


## The following for loop is for when 'stream' is set to true above
# for chunk in response:
#     if 'content' in chunk.choices[0].delta:
#         print(chunk.choices[0].delta.content, end="")



#print(response)
print(response.choices[0].message.content)