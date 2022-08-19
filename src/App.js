import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import TokenContext from "./contexts/TokenContext.js";
import UserContext from "./contexts/UserContext.js";
import ClickedUserContext from "./contexts/ClickedUserContext.js";

import SignUp from "./pages/SignUp.js";
import Timeline from "./pages/Timeline.js";
import HashtagTimeline from "./pages/HashtagTimeline.js";
import UserTimeline from "./pages/UserTimeline.js";
import SignIn from "./pages/SignIn.js";
export default function App() {
    const [token, setToken] = useState(null);
    const [user, setUser] = useState({
        userId: "",
        username: "",
        profilePic: ""
    })
    //const [url, setUrl] = useState('https://linkr-back-api.herokuapp.com'); //Colocar link do deploy
    const [url, setUrl] = useState('http://localhost:5000');

    const authorization = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const [followersList, setFollowersList] = useState([]);
    const [isUserPosts, setIsUserPosts] = useState(false);
    const [isFollowed, setIsFollowed] = useState(false);
    const [clickedUser, setClickedUser] = useState({});

    return (
        <ClickedUserContext.Provider value={{followersList, setFollowersList,
        isUserPosts, setIsUserPosts, isFollowed, setIsFollowed, clickedUser, setClickedUser}}>
            <TokenContext.Provider value={{setToken, token, authorization}}>
                <UserContext.Provider value={{ url, user, setUser }}>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<SignIn />} />
                            <Route path="/sign-up" element={<SignUp />} />
                            <Route path="/timeline" element={<Timeline />} />
                            <Route path="/hashtag/:hashtag" element={<HashtagTimeline />} />
                            <Route path="/user/:id" element={<UserTimeline />} />
                        </Routes>
                    </BrowserRouter>
                </UserContext.Provider>
            </TokenContext.Provider>
        </ClickedUserContext.Provider>
    )
};