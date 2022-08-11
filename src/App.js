import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import TokenContext from "./contexts/TokenContext.js";
import UserContext from "./contexts/UserContext.js";

import SignUp from "./pages/SignUp.js";
import Timeline from "./pages/Timeline.js";
import HashtagTimeline from "./pages/HashtagTimeline.js";
import UserTimeline from "./pages/UserTimeline.js";
import SignIn from "./pages/SignIn.js";
export default function App() {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState("")
    const [url, setUrl] = useState('https://linkr-back-api.herokuapp.com'); //Colocar link do deploy

    return (
        <TokenContext.Provider value={{setToken, token}}>
            <UserContext.Provider value={{ url, user, setUser }}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<SignIn />} />
                        <Route path="/sign-up" element={<SignUp />} />
                        <Route path="/sign-in" element={<SignIn />} />
                        <Route path="/timeline" element={<Timeline />} />
                        <Route path="/hashtag/:hashtag" element={<HashtagTimeline />} />
                        <Route path="/user/:id" element={<UserTimeline />} />
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        </TokenContext.Provider>
    )
};