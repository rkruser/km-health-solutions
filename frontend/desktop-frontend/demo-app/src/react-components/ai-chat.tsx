import React, {useContext, useState, useEffect, FormEvent} from 'react';
import PatientContext from './patient-context';
import { completeText } from '../api/completion';
import '../css/ai-chat.css';

const AIChat: React.FC = () => {
    const {selectedPatient} = useContext(PatientContext);
    const [input, setInput] = useState<string>("");
    const [responseText, setResponseText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false); // new loading state

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (input) {
            setLoading(true); // start loading
            const systemPrompt = "You will be given a summary of a patient in JSON form. Please answer the query about the patient to the best of your ability.\n\nPatient: ";
            const context = systemPrompt + JSON.stringify(selectedPatient) + "\n\nQuery: " + input;
            const response = await completeText(context);
            console.log(response); // handle the response accordingly
            setResponseText(response);
            setInput(""); // clear input after submission
            setLoading(false); // stop loading
        }
    };

    useEffect(() => {
        setResponseText("");
    }, [selectedPatient]);

    return (
        <div className='AIChat'>
            <h2>AI Chat: Ask about the current patient</h2>
            <div className='AIChatDisplay'>
                {loading ? <div className="loader"></div> : <p>{responseText}</p>} {/* conditionally render loader */}
            </div>
            <form onSubmit={handleSubmit} className='AIChatForm'>
                <input 
                    type="text" 
                    value={input} 
                    onChange={e => setInput(e.currentTarget.value)} 
                    placeholder="Type your message"
                    disabled={loading} // disable input during loading
                />
                <button type="submit" disabled={loading}> {/* disable button during loading */}
                    {loading ? "Loading..." : "Send"}
                </button>
            </form>
        </div>
    )
}

export default AIChat;
