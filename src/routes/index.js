import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import Home from 'pages/home';
import SignIn from 'pages/sign-in';
import SignUp from 'pages/sign-up';
import ForgotPassword from 'pages/forgot-password';
import ErrorPage from 'pages/errorPage';
import Subscription from 'pages/subscription';
import Income from 'pages/income';
import Setting from 'pages/setting';
import Profile from 'pages/profile';
import Reviews from 'pages/reviews';
import Video from 'pages/video';
import Upload from 'pages/upload';
import NewStream from 'pages/new-stream';
import Stream from 'pages/stream';
import Setup from 'pages/set-up';
import UserProfile from 'pages/userProfile';
import Test from 'pages/test';


export default (
    <Router>
        <Routes>
            <Route startsWith exact path="/sign-in" element={<SignIn />} />
            <Route path="/" element={<Home />} />
            <Route path="/sign-up" element={<SignUp />} />
            <Route path="/set-up" element={<Setup />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/subscription" element={<Subscription />} />
            <Route path="/income" element={<Income />} />
            <Route path="/setting/:id" element={<Setting />} />
            {/* <Route path="/profile/:userId" element={<Profile />} /> */}
            <Route path="/my_profile" element={<Profile />} />
            <Route path="/user_profile" element={<UserProfile />} />
            <Route path="/reviews/:userId" element={<Reviews />} />
            <Route path="/video/:id" element={<Video />} />
            <Route path="stream/:id" element={<Stream />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/new-stream" element={<NewStream />} />
            <Route path="/test-stream" element={<Test />} />
            <Route path="*" element={<ErrorPage />} />
        </Routes>
    </Router>
)