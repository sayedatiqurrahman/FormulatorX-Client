import React, { createContext, useState } from 'react';
export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const [email, setEmail] = useState("")
    // Headline  States
    const [Headline, setHeadline] = useState('')
    const [headerBG, setHeaderBG] = useState("https://i.ibb.co/8mcMH11/image.png")
    // Questions States
    const [questions, setQuestions] = useState([]);

    const allInfo = {
        email,
        setEmail,
        Headline,
        setHeadline,
        questions,
        setQuestions,
        headerBG,
        setHeaderBG
    }
    return (
        <AuthContext.Provider value={allInfo}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;