import React, {useContext, useState, FormEvent} from 'react';
import PatientContext from './patient-context';
import { completeText } from '../api/completion';
import '../css/ai-chat.css';


const AIChat: React.FC = () => {
    const {selectedPatient} = useContext(PatientContext);
    const [input, setInput] = useState<string>("");
    const [responseTest, setResponseTest] = useState<string>("");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (input) {
            const systemPrompt = "You will be given a summary of a patient in JSON form. Please answer the query about the patient to the best of your ability.\n\nPatient: ";
            const context = systemPrompt + JSON.stringify(selectedPatient) + "\n\nQuery: " + input;
            const response = await completeText(context);
            console.log(response); // handle the response accordingly
            setResponseTest(response);
            setInput(""); // clear input after submission
        }
    };

    return (
        <div className='AIChat'>
            <h2>AI Chat: Ask about the current patient</h2>
            <div className='AIChatDisplay'>
                <p>{responseTest}</p>
            </div>
            <form onSubmit={handleSubmit} className='AIChatForm'>
                <input 
                    type="text" 
                    value={input} 
                    onChange={e => setInput(e.currentTarget.value)} 
                    placeholder="Type your message"
                />
                <button type="submit">Send</button>
            </form>
        </div>
    )
}

export default AIChat;
