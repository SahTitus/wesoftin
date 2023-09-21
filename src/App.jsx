
import { Routes, Route, } from "react-router-dom";
import UserProfileList from './pages/UserProfileList.jsx';
import UserProfileDetail from './pages/UserProfileDetails.jsx';

function App() {
    return (
      <div>
      <Routes>
      <Route path="/" element={<UserProfileList />}></Route>
      <Route index element={<UserProfileList />} />
        <Route path="/details/:id" element={<UserProfileDetail/>} />
    </Routes>
    </div>
    );
}

export default App;
