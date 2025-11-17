import { Routes, Route } from "react-router-dom";

// Auth Pages
import RoleSelect from "./pages/RoleSelect";
import RegisterStep1 from "./pages/Registerform/RegisterStep1";
import ClientRegisterStep1 from "./pages/Registerform/ClientRegister/ClientRegisterStep1";
import OTPVerify from "./pages/OTPVerify";
import ClientOtpVerify from "./pages/Clientotpverifiy/ClientOtpVerify";
import LoginSelect from "./pages/LoginForm/LoginSelect";
import LoginForm from "./pages/LoginForm/LoginForm";

// Profile Setup
import Details1 from "./pages/Details1";
import Details2 from "./pages/Details2";
import ClientDetails1 from "./pages/Freelancerpage/Freelancerdetaildashpage/ClientDetails1";

import BuildProfile from "./pages/BuildProfile";
import AfterSubmitBuildProfile from "./pages/AfterSmbmiteBuildProfile";

// Freelancer Dashboard
import Dashboard from "./pages/Dashboard";

// Client Dashboard (Layout Page)

import ClientDashboard2 from "./pages/ClientDashbroad2";

// Client Pages (Dynamic content)
import AccountDetails from "./pages/Accountpages/AccountDetails";
import Settings from "./pages/Settings";
import Dash from "./pages/Dash";
import ClientServiceListPage from "./pages/Clientpages/Clientservicepage/ClientServiceListPage";

// Services
import SkillHub from "./pages/Skillhub";
import Services from "./pages/Service";
import AddService from "./pages/AddService";
import EditService from "./pages/EditService";
import ViewMore from "./pages/ViewMore";

// Portfolio
import AddPortfolioPage from "./pages/AddPortfolioPage";

// Misc
import TestConnection from "./pages/TestConnection";
import ServiceDetailsModal from "./pages/ServiceDetailsModal";
import MyJobs from "./pages/MyJobs";
import CreateService from "./pages/Clientpages/CreateserviceClient/CreateService";
import BrowseProjects from "./pages/BrowseProjects";
import FreelancerProfile from "./pages/FreelancerProfile";
import Profile from "./pages/Freelancerpage/FreelancerProfile/Profile";
import ClientProfile from "./pages/Clientpages/ClientProfile/ClientProfile"
import Categories from "./pages/Categories";
import FreelanceHome from "./pages/Freelancerpage/FreelanceHome/FreelanceHome";

import FreelancerDashboard from "./pages/Freelancehomedash"

import Homeclient from "./pages/Clientpages/home/Home"
// import Clientslider from "./pages/Clientpages/slidebar/ClientSidebar"
import Sidebar from "./pages/Freelancerpage/components/Sidebar";
import ClientSidebar from "./pages/Clientpages/slidebar/ClientSidebar"
import ClientHome from "./pages/Clientpages/home/Home";
import ClientDetails2 from "./pages/Clientpages/ClientDetaildashpage/ClientDetails2";


import Firelogin from "./Firebaselogin/fireLogin"
import Firebaseregister from "./Firebaseregister/Firebaseregister"
import FreelancerSignup from "./FreelancerRegister/FreelancerSignupScreen";
import FreelancerOtp from "./FreelancerRegister/FreelancerOtpScreen";
import FreelancerDetails from "./FreelancerRegister/FreelancerDetailsScreen";
import SignUpClient from "./ClientRegister/signinClient";
import OtpScreen from "./ClientRegister/otp_service";
import ClientDetails from "./ClientRegister/ClientDetials";
import ProfessionalStatus from "./FreelancerRegister/profesionalStatusScreen";
import ProfileBuildPage from "./fireBaseUserProfile/BuildProfileScreen";
import ProfileMenuPage from "./fireBaseUserProfile/profile_menu_screen";
import UserProfilePage from "./fireBaseUserProfile/userProfileProvider";
import useUserProfile from "./fireBaseUserProfile/UseUserProfile";


export default function App() {
  return (
    <Routes>

      <Route path="/Profilebuilder" element={<ProfileBuildPage/>} />
      <Route path="/Profilemenu" element={<ProfileMenuPage/>}/>
      <Route path="/Userprofile" element={<UserProfilePage/>}/>
      <Route path="/UseUserprofile" element={<useUserProfile/>}/>




      {/* ========== Auth ========== */}
      <Route path="/" element={<LoginSelect />} />
      <Route path="/roleselect" element={<RoleSelect />} />
      <Route path="/register" element={<RegisterStep1 />} />
      <Route path="/client-register" element={<ClientRegisterStep1 />} />
      <Route path="/verify-otp" element={<OTPVerify />} />
      <Route path="/client-verify" element={<ClientOtpVerify />} />

      {/* ========== Login & Profile Setup ========== */}
      <Route path="/login" element={<LoginForm />} />
      <Route path="/details1" element={<Details1 />} />
      <Route path="/details2" element={<Details2 />} />
      <Route path="/client-details1" element={<ClientDetails1 />} />

      {/* ========== FREELANCER Dashboard ========== */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* ******************************************************************
         CLIENT DASHBOARD — THIS PAGE CONTAINS SIDEBAR + <Outlet />
         ****************************************************************** */}



      {/* AUTH */}
      <Route path="/" element={<LoginSelect />} />
      {/* <Route path="/login" element={<LoginForm />} /> */}

      <Route path="/client-details2" element={<ClientDetails2 />} />

      {/* CLIENT DASHBOARD */}
      <Route path="/client-dashbroad2" element={<ClientDashboard2 />}>
        <Route index element={<ClientHome />} />
        <Route path="clienthome" element={<ClientHome />} />
        <Route path="clientprofile" element={<ClientProfile userType={"client"} />} />
        <Route path="categories" element={<Categories />} />
        <Route path="clientservicelistpage" element={<ClientServiceListPage />} />
        <Route path="serviceDetailsModel/:id" element={<ServiceDetailsModal />} />
        <Route path="account-details" element={<AccountDetails />} />
      </Route>

      {/* FREELANCER DASHBOARD */}
      <Route path="/freelance-dashboard" element={<FreelancerDashboard />}>
        <Route index element={<FreelanceHome />} />
        <Route path="freelanceHome" element={<FreelanceHome />} />
        <Route path="browse-projects" element={<BrowseProjects />} />
        <Route path="account-details" element={<AccountDetails />} />
        <Route path="settings" element={<Settings />} />
        <Route path="categories" element={<Categories />} />
        <Route path="Profilebuilder" element={<ProfileBuildPage userType={"freelancer"} />} />
      </Route>



      {/* ========== Services ========== */}
      <Route path="/service" element={<Services />} />
      <Route path="/add-service" element={<AddService />} />
      <Route path="/edit-service/:id" element={<EditService />} />
      <Route path="/view-service/:id" element={<ViewMore />} />

      {/* ========== Skills / Portfolio ========== */}
      <Route path="/skill-hub" element={<SkillHub />} />
      <Route path="/add-portfolio" element={<AddPortfolioPage />} />

      {/* ========== Build Profile ========== */}
      <Route path="/buildprofile" element={<BuildProfile />} />
      <Route path="/aftersubmitbuildprofile" element={<AfterSubmitBuildProfile />} />

      {/* ========== Misc ========== */}
      <Route path="/test" element={<TestConnection />} />
      <Route path="/clientservicelistpage" element={<ClientServiceListPage />} />
      <Route path="/serviceDetailsModel/:id" element={<ServiceDetailsModal />} />

      <Route path="/myjobs" element={<MyJobs />} />
      <Route path="/createservice" element={<CreateService />} />
      <Route path="/create-service24" element={<CreateService />} />

      {/* ========== client home ========== */}

      <Route path="/clienthome" element={<Homeclient />} />
      <Route path="/slidebar" element={<Sidebar />} />

      <Route path="/ClientSidebar" element={<ClientSidebar />} />
      <Route path="/freelanceHome" element={<FreelanceHome />} />

      {/* ========== firebase auth ========== */}

      <Route path="/firelogin" element={<Firelogin />} />
      <Route path="/fireregister" element={<Firebaseregister />} />

      {/* ========== freelance reg ========== */}
      <Route path="/freelancer-signup" element={<FreelancerSignup />} />
      <Route path="/freelancer-otp" element={<FreelancerOtp />} />
      <Route path="/freelancer-details" element={<FreelancerDetails />} />
     <Route path="/professional-status" element={<ProfessionalStatus/>} />

 {/* ========== client reg ========== */}
 <Route path="/client-signup" element={<SignUpClient/>} />
  <Route path="/otp" element={<OtpScreen/>} />
  <Route path="/client-details" element={<ClientDetails/>} />

{/* ========== client reg ========== */}


    </Routes>
  );
}

