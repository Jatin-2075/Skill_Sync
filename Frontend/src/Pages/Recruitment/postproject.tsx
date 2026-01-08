import { X, Info, Bold, Italic, List, Link, Image, Check, Plus, Minus, Clock, Users, MessageSquare } from 'lucide-react';

type postprojecttype = {
    projecttitle: string;
    projectsummary: string;
    projectcategory: string;
    projectvisibility: string;
    desiredteammember: number;
    projectdescription: string;
    ratingrequired: number;
    currentteammember: number;
    

};


const PostProjectPage = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
            <span className="text-white font-bold text-lg">P</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Post a Project</h1>
            <p className="text-sm text-gray-500">Define Your Vision. Build your team.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <span className="flex items-center gap-1 text-sm text-green-600">
            <Check className="w-4 h-4" />
            Auto-saved
          </span>
          <button className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 flex gap-6">
        {/* Main Content */}
        <div className="flex-1 space-y-6">
          {/* Basic Project Details */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Basic Project Details</h2>
            </div>

            <div className="space-y-5">
              {/* Project Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Project Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Decentralized Voting System for DAOs"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Short Summary */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Short Summary <span className="text-red-500">*</span>
                  </label>
                  <span className="text-xs text-gray-400">Card-level pitch (140 chars max)</span>
                </div>
                <textarea
                  placeholder="Briefly describe what you're building to attract clicks..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
                />
              </div>

              {/* Category and Visibility */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Category / Domain
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white">
                    <option>Web Development</option>
                    <option>Mobile Development</option>
                    <option>Blockchain</option>
                    <option>AI/ML</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    Visibility
                    <Info className="w-4 h-4 text-gray-400" />
                  </label>
                  <div className="relative">
                    <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white appearance-none">
                      <option>Public (Recommended)</option>
                      <option>Private</option>
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                      🔓
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Project Narrative */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-semibold">2</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Project Narrative</h2>
            </div>

            {/* Toolbar */}
            <div className="flex items-center gap-1 mb-4 pb-3 border-b border-gray-200">
              <button className="p-2 hover:bg-gray-100 rounded">
                <Bold className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Italic className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <List className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <List className="w-4 h-4 text-gray-600 rotate-180" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Link className="w-4 h-4 text-gray-600" />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded">
                <Image className="w-4 h-4 text-gray-600" />
              </button>
              <span className="ml-auto text-xs text-gray-400">Markdown supported</span>
            </div>

            {/* Editor */}
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-semibold text-gray-700 mb-1">Problem Statement & Vision</h3>
                <p className="text-xs text-gray-500 mb-2">🎯 The Why</p>
                <textarea
                  placeholder="Explain the problem you are solving..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none bg-gray-50"
                />
              </div>
              <div>
                <p className="text-xs text-gray-500 mb-2">🔧 The How</p>
                <textarea
                  placeholder="Describe your technical approach..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none resize-none bg-gray-50"
                />
              </div>
            </div>

            {/* Footer Actions */}
            <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-between">
              <span className="text-xs text-gray-500">Draft saved 2m ago</span>
              <div className="flex gap-2">
                <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                  Preview
                </button>
                <button className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg">
                  Save Draft
                </button>
              </div>
            </div>

            {/* Repository Link */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Repository / Demo Link <span className="text-gray-400 text-xs">(Optional)</span>
              </label>
              <input
                type="text"
                placeholder="🔗 https://github.com/username/repo"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
              />
            </div>

            {/* Key Deliverables */}
            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-3 flex items-center gap-2">
                🎯 Key Deliverables & Goals
              </label>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <input type="checkbox" checked className="w-4 h-4 text-green-600" readOnly />
                  <span className="flex-1 text-sm text-gray-700">MVP with core authentication flow</span>
                  <span className="px-2 py-0.5 bg-green-600 text-white text-xs rounded">DONE</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                  <input type="checkbox" className="w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Add a milestone or goal..."
                    className="flex-1 text-sm bg-transparent border-none outline-none"
                  />
                </div>
                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>
            </div>
          </div>

          {/* Skills & Requirements */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-semibold">3</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Skills & Requirements</h2>
            </div>

            <div className="space-y-5">
              {/* Tech Stack */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Required Skills / Tech Stack
                </label>
                <div className="flex flex-wrap gap-2 mb-2">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center gap-1">
                    React Native
                    <X className="w-3 h-3 cursor-pointer" />
                  </span>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full flex items-center gap-1">
                    TypeScript
                    <X className="w-3 h-3 cursor-pointer" />
                  </span>
                </div>
                <input
                  type="text"
                  placeholder="Type and press Enter..."
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none"
                />
              </div>

              {/* Platform Rating & Team Size */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Min. Platform Rating
                  </label>
                  <div className="relative">
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      defaultValue="500"
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-gray-500 mt-1">
                      <span>New User</span>
                      <span className="font-medium text-gray-900">1000+</span>
                      <span>Expert</span>
                    </div>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Team Size <span className="text-gray-400 text-xs">(Including you)</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-2xl font-semibold text-gray-900 w-24 text-center">3 Members</span>
                    <button className="w-10 h-10 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Role Label */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Role Label
                </label>
                <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none bg-white">
                  <option>Full Stack Developer</option>
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Designer</option>
                </select>
              </div>

              {/* Alert */}
              <div className="flex gap-3 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="text-yellow-600 mt-0.5">⚠️</div>
                <div className="flex-1">
                  <h4 className="text-sm font-semibold text-yellow-800 mb-1">Strict Requirements Alert</h4>
                  <p className="text-xs text-yellow-700">
                    Setting the minimum rating above 200+ reduces your candidate pool by ~65%. Consider lowering it for a broader reach.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Availability & Collaboration */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
                <span className="text-teal-600 font-semibold">4</span>
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Availability & Collaboration</h2>
            </div>

            <div className="space-y-5">
              {/* Commitment & Duration */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Commitment
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white">
                    <option>Part-time (10-20 hrs/week)</option>
                    <option>Full-time (40+ hrs/week)</option>
                    <option>Flexible</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Project Duration
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white">
                    <option>1-3 Months</option>
                    <option>3-6 Months</option>
                    <option>6+ Months</option>
                  </select>
                </div>
              </div>

              {/* Start Timeline & Timezone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Start Timeline
                  </label>
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg font-medium">
                      Immediate
                    </button>
                    <button className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      Scheduled
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timezone Preference
                  </label>
                  <select className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none bg-white">
                    <option>Global (Any Timezone)</option>
                    <option>EST</option>
                    <option>PST</option>
                    <option>GMT</option>
                  </select>
                </div>
              </div>

              {/* Collaboration Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Collaboration Style
                </label>
                <div className="space-y-3">
                  <label className="flex items-start gap-3 p-4 border-2 border-teal-600 bg-teal-50 rounded-lg cursor-pointer">
                    <input type="radio" name="collab" defaultChecked className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Async First</div>
                      <div className="text-sm text-gray-600">Written comms, minimal meetings.</div>
                    </div>
                  </label>
                  <label className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-gray-300">
                    <input type="radio" name="collab" className="mt-1" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">Synchronous</div>
                      <div className="text-sm text-gray-600">Regular meetings, real-time collab.</div>
                    </div>
                  </label>
                </div>
              </div>

              {/* Communication Norms */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Communication Norms
                </label>
                <textarea
                  placeholder="e.g. We use Discord for daily chat and Notion for tasks. Weekly stand-up on Mondays."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none resize-none"
                />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end gap-3 pb-8">
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium">
              Save Draft
            </button>
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium flex items-center gap-2">
              <span>🚀</span>
              Post Project
            </button>
          </div>
        </div>

        {/* Sidebar - Smart Match */}
        <div className="w-80">
          <div className="sticky top-6">
            <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl p-5 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">⚡</span>
                  <h3 className="font-semibold">Smart Match</h3>
                </div>
                <span className="px-2 py-0.5 bg-green-500 text-white text-xs font-semibold rounded">LIVE</span>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold mb-1">14</div>
                <div className="text-sm text-gray-400">Candidates</div>
              </div>

              <div className="mb-4">
                <div className="text-3xl font-bold text-green-400 mb-1">92%</div>
                <div className="text-sm text-gray-400">Avg Match</div>
              </div>

              <div className="border-t border-slate-700 pt-4 mt-4">
                <div className="text-xs text-gray-400 mb-3">TOP MATCHES PREVIEW</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-semibold">
                      ER
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">Elena R.</div>
                      <div className="text-xs text-gray-400 truncate">React Native • TypeScript • SEO rating</div>
                    </div>
                    <div className="text-green-400 font-semibold text-sm">98%</div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-slate-800/50 rounded-lg">
                    <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center font-semibold">
                      MJ
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm">Marcus J.</div>
                      <div className="text-xs text-gray-400 truncate">Full Stack • System Design • 200 rating</div>
                    </div>
                    <div className="text-green-400 font-semibold text-sm">94%</div>
                  </div>
                </div>
                <button className="w-full mt-3 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg text-sm font-medium transition-colors">
                  +12 more candidates match your current criteria.
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PostProjectPage;