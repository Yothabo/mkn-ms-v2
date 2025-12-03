import { Routes, Route } from 'react-router-dom';
import Home from '../pages/member/Home';
import Announcements from '../pages/member/Announcements';
import HymnBook from '../pages/member/HymnBook';
import MyDuties from '../pages/member/MyDuties';
import MyProfile from '../pages/member/MyProfile';

export default function MemberRoutes() {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="announcements" element={<Announcements />} />
      <Route path="hymns" element={<HymnBook />} />
      <Route path="duties" element={<MyDuties />} />
      <Route path="profile" element={<MyProfile />} />
      <Route path="*" element={<Home />} />
    </Routes>
  );
}
