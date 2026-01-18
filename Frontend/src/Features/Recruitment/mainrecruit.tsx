// import { NavLink, Outlet } from "react-router-dom";

// const MainRecruit = () => {
//   return (
//     <div>
//       <div className="pp-header-section">
//         <div className="pp-header-content">
//           <div className="pp-header-text">
//             <h1 className="pp-page-title">Team Recruitment</h1>
//             <p className="pp-page-description">
//               Find the perfect teammate. Filter by skill vectors, rating, and availability to build your dream team.
//             </p>
//           </div>
//         </div>

//         <div className="pp-tabs-border">
//           <nav className="pp-tabs-nav">
//             <NavLink
//               to="findcollaborators"
//               className={({ isActive }) =>
//                 isActive ? "pp-tab pp-tab-active" : "pp-tab"
//               }
//             >
//               Find Collaborators
//             </NavLink>

//             <NavLink
//               to="postproject"
//               className={({ isActive }) =>
//                 isActive ? "pp-tab pp-tab-active" : "pp-tab"
//               }
//             >
//               Post a Project
//               <span className="pp-tab-badge pp-badge-new">NEW</span>
//             </NavLink>

//             <NavLink
//               to="myproposals"
//               className={({ isActive }) =>
//                 isActive ? "pp-tab pp-tab-active" : "pp-tab"
//               }
//             >
//               My Proposals
//               <span className="pp-tab-badge pp-badge-count">2</span>
//             </NavLink>
//           </nav>
//         </div>
//       </div>

//       {/* Child pages render here */}
//       <Outlet />
//       <FindCollaborators />
//     </div>
//   );
// };

// export default MainRecruit;
