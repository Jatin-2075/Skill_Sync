import React, { useState } from 'react';
import './proposals.css';

interface Proposal {
  id: string;
  name: string;
  title: string;
  avatar: string;
  isOnline?: boolean;
  isVerified?: boolean;
  status: 'interviewing' | 'new' | 'reviewing';
  rating: number;
  matchPercentage: number;
  appliedTime: string;
  skills: Array<{ name: string; match?: number }>;
  summary: string;
  projectName: string;
  topPercentage?: string;
}

interface FilterState {
  projects: string[];
  matchMin: number;
  skills: string[];
  ratings: number[];
}

const ProposalsHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'received' | 'sent' | 'archived'>('received');
  const [viewMode, setViewMode] = useState<'list' | 'grid'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('match-high');
  const [filters, setFilters] = useState<FilterState>({
    projects: ['Senior React Dev'],
    matchMin: 75,
    skills: ['React'],
    ratings: []
  });

  const proposals: Proposal[] = [
    {
      id: '1',
      name: 'Alex Chen',
      title: 'Senior Front-End Engineer',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCcebGCw8fdc6AOWxNoBfJfVuws6taiIBFTGHFBp_EMEFrKRAN6xqjNrKJSpDpwT4widOWf811yfCK38DoOkFyRXjxkx0CZPtYiHd1-xRZiPhGiimRR1MxAjM0SO0ZiTY__A-Pzf6-zDiscNHWvA7SXOwSNAnYEoi4S8OtT0HzRpNotpt_yOtkICCBwA2ZjppnBTI4xvNiUWoXBz-ImTxj8x4NrsUPW1D4JijJuHVpszgSPGYh3M_VH27KGvXzIDUcNWg5qiFSpB3A',
      isOnline: true,
      isVerified: true,
      status: 'interviewing',
      rating: 4.9,
      matchPercentage: 98,
      appliedTime: '2h ago',
      skills: [
        { name: 'React', match: 99 },
        { name: 'TypeScript', match: 95 },
        { name: 'Tailwind' },
        { name: 'Redux' }
      ],
      summary: 'Passionate UI developer with 7+ years of experience building scalable applications. Specialize in component systems and performance optimization. Previously led frontend at FinTech startup.',
      projectName: 'Project Alpha',
      topPercentage: 'Top 5%'
    },
    {
      id: '2',
      name: 'Sarah Jenkins',
      title: 'Product Designer',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBp6Ky0brpFoIzujOOH7-omPkPD1N5VlJyyfOF0iC0jSuzZRtSw_a3b5Bjdc_cOkbJ6REcdtcsRp7eXIYKNQeioCqM9oxKt8L_Yom6FnqPrsVeueQhvOqlHa7SWtAu3zmRHUl2ADfKNzqPMFQ_VegzggzxVSarss4W7CMUlcJvf_KSkFh0aXW5ofXRsxJCZ7wpL9NPi9vB7RDJUsByrxOWhxfrQG3ULJikbwIP_cvjzptihXikldgEE0xaGOBaSON4FFPSjPAmN8hA',
      status: 'new',
      rating: 4.7,
      matchPercentage: 85,
      appliedTime: '5h ago',
      skills: [
        { name: 'Figma', match: 90 },
        { name: 'Prototyping' },
        { name: 'User Research' }
      ],
      summary: 'Creative designer focused on data-driven UX. I help startups turn complex problems into intuitive designs. Portfolio includes mobile apps and SaaS dashboards.',
      projectName: 'Mobile App Redesign'
    },
    {
      id: '3',
      name: 'Michael Ross',
      title: 'Full Stack Developer',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBZKCiagXc9Gwq-bthnfmk2-oZNXM5KWQuup_f7aWHBe9m6iJEDueytdYhJMAz5HKWgsrVFQfkrzdnjLOW7aaWyNoWfI3_D7hRj77dSH_0WKjeO16lZG0RXAC6wpcNzqPgno_2pezqpOxDIOVrQSVmN2UVR0twKJrq3RNO8UkpUdOy2m6TTv8Qk4nI6lAIXomA4mgBZYtQe1XHNRssxFWNQzRO0vlhHsFe8w4ez4eHxGzLuMgJpbGn9oIxYRGYUHovAS2vPOBkQpcI',
      status: 'reviewing',
      rating: 4.2,
      matchPercentage: 72,
      appliedTime: '1d ago',
      skills: [
        { name: 'PHP' },
        { name: 'Laravel' },
        { name: 'Vue.js' }
      ],
      summary: 'Looking to transition into more React-heavy roles. Strong background in backend architecture and database management. Quick learner and adaptable.',
      projectName: 'Legacy System Update'
    }
  ];

  const handleResetFilters = () => {
    // Logic to reset all filters
  };

  const handleProjectFilterChange = (project: string) => {
    // Logic to toggle project filter
  };

  const handleMatchSliderChange = (value: number) => {
    // Logic to update match percentage minimum
  };

  const handleSkillAdd = (skill: string) => {
    // Logic to add skill to filters
  };

  const handleSkillRemove = (skill: string) => {
    // Logic to remove skill from filters
  };

  const handleRatingFilterChange = (rating: number) => {
    // Logic to toggle rating filter
  };

  const handleSearchChange = (query: string) => {
    // Logic to update search query
  };

  const handleSortChange = (sortOption: string) => {
    // Logic to change sort order
  };

  const handleViewModeToggle = (mode: 'list' | 'grid') => {
    // Logic to toggle view mode
  };

  const handleViewDetails = (proposalId: string) => {
    // Logic to view proposal details
  };

  const handleMessage = (proposalId: string) => {
    // Logic to send message
  };

  const handleArchive = (proposalId: string) => {
    // Logic to archive proposal
  };

  const handlePageChange = (page: number) => {
    // Logic to change page
  };

  return (
    <div className="proposals-hub-container">
      <div className="proposals-hub-layout">
        {/* Left Filter Panel */}
        <FilterSidebar
          filters={filters}
          onResetFilters={handleResetFilters}
          onProjectChange={handleProjectFilterChange}
          onMatchSliderChange={handleMatchSliderChange}
          onSkillAdd={handleSkillAdd}
          onSkillRemove={handleSkillRemove}
          onRatingChange={handleRatingFilterChange}
        />

        {/* Main Content Area */}
        <main className="proposals-main-content">
          {/* Tabs */}
          <TabNavigation activeTab={activeTab} onTabChange={setActiveTab} />

          {/* Toolbar */}
          <Toolbar
            searchQuery={searchQuery}
            sortBy={sortBy}
            viewMode={viewMode}
            onSearchChange={handleSearchChange}
            onSortChange={handleSortChange}
            onViewModeToggle={handleViewModeToggle}
          />

          {/* Proposals List */}
          <ProposalsList
            proposals={proposals}
            onViewDetails={handleViewDetails}
            onMessage={handleMessage}
            onArchive={handleArchive}
          />

          {/* Pagination */}
          <Pagination currentPage={1} totalPages={3} onPageChange={handlePageChange} />
        </main>
      </div>
    </div>
  );
};

interface FilterSidebarProps {
  filters: FilterState;
  onResetFilters: () => void;
  onProjectChange: (project: string) => void;
  onMatchSliderChange: (value: number) => void;
  onSkillAdd: (skill: string) => void;
  onSkillRemove: (skill: string) => void;
  onRatingChange: (rating: number) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onResetFilters,
  onProjectChange,
  onMatchSliderChange,
  onSkillAdd,
  onSkillRemove,
  onRatingChange
}) => {
  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filters</h3>
        <button onClick={onResetFilters} className="reset-button">Reset all</button>
      </div>

      {/* Project Filter */}
      <ProjectFilter selectedProjects={filters.projects} onChange={onProjectChange} />

      <hr className="filter-divider" />

      {/* Match Percentage Filter */}
      <MatchPercentageFilter minValue={filters.matchMin} onChange={onMatchSliderChange} />

      <hr className="filter-divider" />

      {/* Skills Filter */}
      <SkillsFilter
        selectedSkills={filters.skills}
        onAdd={onSkillAdd}
        onRemove={onSkillRemove}
      />

      <hr className="filter-divider" />

      {/* Rating Filter */}
      <RatingFilter selectedRatings={filters.ratings} onChange={onRatingChange} />
    </aside>
  );
};

interface ProjectFilterProps {
  selectedProjects: string[];
  onChange: (project: string) => void;
}

const ProjectFilter: React.FC<ProjectFilterProps> = ({ selectedProjects, onChange }) => {
  const projects = ['Senior React Dev', 'UX Lead Designer', 'Backend Architect'];

  return (
    <div className="filter-section">
      <div className="filter-section-header">
        <span>Project / Role</span>
        <span className="material-symbols-outlined">expand_less</span>
      </div>
      <div className="filter-options">
        {projects.map((project) => (
          <label key={project} className="checkbox-label">
            <input
              type="checkbox"
              checked={selectedProjects.includes(project)}
              onChange={() => onChange(project)}
            />
            <span>{project}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

interface MatchPercentageFilterProps {
  minValue: number;
  onChange: (value: number) => void;
}

const MatchPercentageFilter: React.FC<MatchPercentageFilterProps> = ({ minValue, onChange }) => {
  return (
    <div className="filter-section">
      <div className="filter-section-header">
        <span>Match Percentage</span>
        <span className="material-symbols-outlined">expand_less</span>
      </div>
      <div className="slider-container">
        <input
          type="range"
          min="0"
          max="100"
          value={minValue}
          onChange={(e) => onChange(Number(e.target.value))}
          className="match-slider"
        />
        <div className="slider-labels">
          <span>Min: {minValue}%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};

interface SkillsFilterProps {
  selectedSkills: string[];
  onAdd: (skill: string) => void;
  onRemove: (skill: string) => void;
}

const SkillsFilter: React.FC<SkillsFilterProps> = ({ selectedSkills, onAdd, onRemove }) => {
  const availableSkills = ['React', 'TypeScript', 'Node.js', 'Figma'];
  const [skillInput, setSkillInput] = useState('');

  const handleAddSkill = () => {
    // Logic to add skill
  };

  return (
    <div className="filter-section">
      <div className="filter-section-header">
        <span>Skills</span>
        <span className="material-symbols-outlined">expand_less</span>
      </div>
      <div className="skill-search">
        <span className="material-symbols-outlined">search</span>
        <input
          type="text"
          placeholder="Add skill..."
          value={skillInput}
          onChange={(e) => setSkillInput(e.target.value)}
        />
      </div>
      <div className="skill-tags">
        {availableSkills.map((skill) => (
          <span
            key={skill}
            className={`skill-tag ${selectedSkills.includes(skill) ? 'selected' : ''}`}
            onClick={() => selectedSkills.includes(skill) ? onRemove(skill) : onAdd(skill)}
          >
            {skill}
            {selectedSkills.includes(skill) && (
              <span className="material-symbols-outlined close-icon">close</span>
            )}
          </span>
        ))}
      </div>
    </div>
  );
};

interface RatingFilterProps {
  selectedRatings: number[];
  onChange: (rating: number) => void;
}

const RatingFilter: React.FC<RatingFilterProps> = ({ selectedRatings, onChange }) => {
  const ratings = [
    { value: 5, label: '5.0' },
    { value: 4, label: '4.0+' }
  ];

  const renderStars = (count: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`material-symbols-outlined star ${i < count ? 'filled' : ''}`}
      >
        star
      </span>
    ));
  };

  return (
    <div className="filter-section">
      <div className="filter-section-header">
        <span>Platform Rating</span>
        <span className="material-symbols-outlined">expand_less</span>
      </div>
      <div className="filter-options">
        {ratings.map((rating) => (
          <label key={rating.value} className="checkbox-label rating-label">
            <input
              type="checkbox"
              checked={selectedRatings.includes(rating.value)}
              onChange={() => onChange(rating.value)}
            />
            <div className="star-rating">{renderStars(rating.value)}</div>
            <span className="rating-text">({rating.label})</span>
          </label>
        ))}
      </div>
    </div>
  );
};

interface TabNavigationProps {
  activeTab: 'received' | 'sent' | 'archived';
  onTabChange: (tab: 'received' | 'sent' | 'archived') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className="tab-navigation">
      <button
        className={`tab ${activeTab === 'received' ? 'active' : ''}`}
        onClick={() => onTabChange('received')}
      >
        <span>Received</span>
        <span className="badge">12</span>
      </button>
      <button
        className={`tab ${activeTab === 'sent' ? 'active' : ''}`}
        onClick={() => onTabChange('sent')}
      >
        <span>Sent</span>
        <span className="badge">5</span>
      </button>
      <button
        className={`tab ${activeTab === 'archived' ? 'active' : ''}`}
        onClick={() => onTabChange('archived')}
      >
        <span>Archived</span>
      </button>
    </div>
  );
};

interface ToolbarProps {
  searchQuery: string;
  sortBy: string;
  viewMode: 'list' | 'grid';
  onSearchChange: (query: string) => void;
  onSortChange: (sortOption: string) => void;
  onViewModeToggle: (mode: 'list' | 'grid') => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  searchQuery,
  sortBy,
  viewMode,
  onSearchChange,
  onSortChange,
  onViewModeToggle
}) => {
  return (
    <div className="toolbar">
      <div className="search-box">
        <span className="material-symbols-outlined">search</span>
        <input
          type="text"
          placeholder="Search candidates, skills, or keywords..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="toolbar-controls">
        <div className="sort-select-wrapper">
          <select value={sortBy} onChange={(e) => onSortChange(e.target.value)}>
            <option value="match-high">Match % (High to Low)</option>
            <option value="newest">Newest First</option>
            <option value="rating-high">Rating (High to Low)</option>
          </select>
          <span className="material-symbols-outlined">expand_more</span>
        </div>
        <div className="view-toggle">
          <button
            className={viewMode === 'list' ? 'active' : ''}
            onClick={() => onViewModeToggle('list')}
          >
            <span className="material-symbols-outlined">view_list</span>
          </button>
          <button
            className={viewMode === 'grid' ? 'active' : ''}
            onClick={() => onViewModeToggle('grid')}
          >
            <span className="material-symbols-outlined">grid_view</span>
          </button>
        </div>
      </div>
    </div>
  );
};

interface ProposalsListProps {
  proposals: Proposal[];
  onViewDetails: (id: string) => void;
  onMessage: (id: string) => void;
  onArchive: (id: string) => void;
}

const ProposalsList: React.FC<ProposalsListProps> = ({
  proposals,
  onViewDetails,
  onMessage,
  onArchive
}) => {
  return (
    <div className="proposals-list">
      {proposals.map((proposal) => (
        <ProposalCard
          key={proposal.id}
          proposal={proposal}
          onViewDetails={onViewDetails}
          onMessage={onMessage}
          onArchive={onArchive}
        />
      ))}
    </div>
  );
};

interface ProposalCardProps {
  proposal: Proposal;
  onViewDetails: (id: string) => void;
  onMessage: (id: string) => void;
  onArchive: (id: string) => void;
}

const ProposalCard: React.FC<ProposalCardProps> = ({
  proposal,
  onViewDetails,
  onMessage,
  onArchive
}) => {
  const getStatusBadge = () => {
    // Logic to return status badge element
  };

  const renderStars = (rating: number) => {
    // Logic to render star rating
  };

  return (
    <div className={`proposal-card ${proposal.status}`}>
      <div className="card-content">
        <div className="avatar-section">
          <img src={proposal.avatar} alt={proposal.name} className="avatar" />
          {proposal.isOnline && (
            <div className="online-indicator">
              <span className="material-symbols-outlined">check</span>
            </div>
          )}
        </div>

        <div className="details-section">
          <div className="header-row">
            <div>
              <h3 className="candidate-name">
                {proposal.name}
                {proposal.isVerified && (
                  <span className="material-symbols-outlined verified">verified</span>
                )}
              </h3>
              <p className="candidate-title">{proposal.title}</p>
            </div>
            <StatusBadge status={proposal.status} />
          </div>

          <div className="metrics-row">
            <div className="rating">
              <span className="material-symbols-outlined star filled">star</span>
              <span>{proposal.rating}</span>
              {proposal.topPercentage && (
                <span className="top-percentage">({proposal.topPercentage})</span>
              )}
            </div>
            <div className="match-percentage">
              <span className="material-symbols-outlined">pie_chart</span>
              <span>{proposal.matchPercentage}% Match</span>
            </div>
            <div className="applied-time">
              <span className="material-symbols-outlined">schedule</span>
              <span>Applied {proposal.appliedTime}</span>
            </div>
          </div>

          <div className="skills-row">
            {proposal.skills.map((skill, index) => (
              <span key={index} className="skill-badge">
                {skill.name}
                {skill.match && <span className="skill-match"> {skill.match}%</span>}
              </span>
            ))}
          </div>

          <p className="summary">{proposal.summary}</p>
        </div>
      </div>

      <div className="actions-section">
        <div className="action-buttons">
          <button className="btn-primary" onClick={() => onViewDetails(proposal.id)}>
            View Details
          </button>
          <button className="btn-secondary" onClick={() => onMessage(proposal.id)}>
            <span className="material-symbols-outlined">chat_bubble</span>
            Message
          </button>
        </div>
        <div className="project-link">
          For: <a href="#">{proposal.projectName}</a>
        </div>
      </div>
    </div>
  );
};

interface StatusBadgeProps {
  status: 'interviewing' | 'new' | 'reviewing';
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const getStatusConfig = () => {
    // Logic to return status configuration
  };

  return (
    <span className={`status-badge ${status}`}>
      <span className="status-dot"></span>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const handlePrevious = () => {
    // Logic to go to previous page
  };

  const handleNext = () => {
    // Logic to go to next page
  };

  return (
    <div className="pagination">
      <button
        className="pagination-btn"
        onClick={handlePrevious}
        disabled={currentPage === 1}
      >
        <span className="material-symbols-outlined">chevron_left</span>
      </button>
      <button className="pagination-btn active">1</button>
      <button className="pagination-btn" onClick={() => onPageChange(2)}>2</button>
      <button className="pagination-btn" onClick={() => onPageChange(3)}>3</button>
      <span className="pagination-ellipsis">...</span>
      <button className="pagination-btn" onClick={handleNext}>
        <span className="material-symbols-outlined">chevron_right</span>
      </button>
    </div>
  );
};

export default ProposalsHub;