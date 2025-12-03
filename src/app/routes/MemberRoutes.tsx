import { Routes, Route } from 'react-router-dom';
import Home from '../../pages/member/Home/Home';
import Feed from '../../pages/member/Feed/Feed';
import Media from '../../pages/member/Media/Media';
import MyDuties from '../../pages/member/MyDuties/MyDuties';
import MyProfile from '../../pages/member/MyProfile/MyProfile';

export default function MemberRoutes() {
  return (
    <Routes>
      <Route path="home" element={<Home />} />
      <Route path="feed" element={<Feed />} />
      <Route path="media" element={<Media />} />
      <Route path="duties" element={<MyDuties />} />
      <Route path="profile" element={<MyProfile />} />
      
      {/* Empty catch-all - let the layout handle ALL persistence */}
      <Route path="*" element={null} />
    </Routes>
  );
}
