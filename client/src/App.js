import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './components/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {Fragment} from 'react';
import Login from './components/Login';
import AuthState from './contexts/auth/AuthState';
import axios from 'axios';
import PublicRoute from './components/PublicRoute';
import PrivateRoute from './components/PrivateRoute';
import Bootcamps from './components/Bootcamps';
import Register from './components/Register';
import Bootcamp from './components/Bootcamp';
import AddReview from './components/AddReview';
import AddCourse from './components/AddCourse';
import Review from './components/Review';
import ManageCourses from './components/ManageCourses';
import ManageBootcamp from './components/ManageBootcamp';
import ResetPassword from './components/ResetPassword';
import PasswordChange from './components/PasswordChange';
import UpdateReview from './components/UpdateReviews';
import ManageReviews from './components/ManageReviews';

axios.defaults.withCredentials = true;
function App() {
  return (
    <AuthState>
    <BrowserRouter>
    <Fragment>
    
    <div className="App">
      <Header />
      <div className="content">
      <Routes>
      <Route path="/" element={<Home />} /> 
      <Route path="/bootcamps" element={<Bootcamps />} /> 
      <Route path="/bootcamps/:slug" element={<Bootcamp />} />
      <Route path="/bootcamps/:slug/add-review" element={<PrivateRoute component={AddReview} />}  />   
      <Route path="/login" element={<PublicRoute component={Login} />} />
      <Route path="/bootcamps/add-course" element={<PrivateRoute component={AddCourse} />} />
      <Route path="/bootcamps/reviews/:slug/update" element={<PrivateRoute component={UpdateReview} />}  />
      <Route path="bootcamps/manage-reviews" element={<PrivateRoute component={ManageReviews} />} /> 
      <Route path="/register" element={<PublicRoute component={Register} />} />
      <Route path="/bootcamps/:slug/reviews" element={<Review />} /> 
      <Route path="/bootcamps/manage-courses" element={<PrivateRoute component={ManageCourses} />} />
      <Route path="/bootcamps/manage-bootcamp" element={<PrivateRoute component={ManageBootcamp} />}  />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/reset-password/:slug" element={<PasswordChange />} />
      </Routes>
      </div>
    </div>
    </Fragment>
    </BrowserRouter>
    </AuthState>
  );
}
export default App;
