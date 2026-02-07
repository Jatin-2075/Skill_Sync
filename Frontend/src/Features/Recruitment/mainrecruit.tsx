import { NavLink, Outlet } from "react-router-dom";
import "../Recruitment/style/mainrecruit.css";

const MainRecruit = () => {
  return (
    <div className="mr-page">
      {/* Header */}
      <section className="mr-header-section">
        <div className="app-container">
          <div className="mr-header-content">
            <div className="mr-header-text">
              <h1 className="mr-page-title">Team Recruitment</h1>
              <p className="mr-page-description">
                Find the perfect teammate. Filter by skill vectors, rating, and availability to build your dream team.
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mr-tabs-border">
          <div className="app-container">
            <nav className="mr-tabs-nav">
              <NavLink
                to="findcollaborators"
                className={({ isActive }) =>
                  isActive ? "mr-tab mr-tab-active" : "mr-tab"
                }
              >
                Find Collaborators
              </NavLink>

              <NavLink
                to="postproject"
                className={({ isActive }) =>
                  isActive ? "mr-tab mr-tab-active" : "mr-tab"
                }
              >
                Post a Project
                <span className="mr-tab-badge mr-badge-new">NEW</span>
              </NavLink>

              <NavLink
                to="myproposals"
                className={({ isActive }) =>
                  isActive ? "mr-tab mr-tab-active" : "mr-tab"
                }
              >
                My Proposals
                <span className="mr-tab-badge mr-badge-count">2</span>
              </NavLink>
            </nav>
          </div>
        </div>
      </section>

      {/* Page Content */}
      <Outlet />
    </div>
  );
};

export default MainRecruit;
