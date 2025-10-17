import { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export function UploadAnalyze() {
  const [activeTab, setActiveTab] = useState<'jira' | 'story'>('jira');
  const [metadataOpen, setMetadataOpen] = useState(true);

  return (
    <div>
      <h2 className="mb-6">Upload / Analyze</h2>

      {/* Tabs */}
      <div className="flex gap-2 mb-6">
        <button
          onClick={() => setActiveTab('jira')}
          className={`px-4 py-2 rounded transition-colors ${
            activeTab === 'jira'
              ? 'bg-transparent border-2 border-blue-600 text-blue-400'
              : 'bg-transparent border-2 border-gray-700 text-gray-400 hover:border-gray-600'
          }`}
        >
          Analyze via JIRA Ticket
        </button>
        <button
          onClick={() => setActiveTab('story')}
          className={`px-4 py-2 rounded transition-colors ${
            activeTab === 'story'
              ? 'bg-transparent border-2 border-blue-600 text-blue-400'
              : 'bg-transparent border-2 border-gray-700 text-gray-400 hover:border-gray-600'
          }`}
        >
          Analyze via User Story
        </button>
      </div>

      {/* Form */}
      <div className="max-w-2xl">
        <form className="space-y-6">
          {/* JIRA Ticket ID */}
          <div>
            <label className="block mb-2">
              JIRA Ticket ID <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., A11Y-2053"
              className="w-full bg-[#0f0f0f] border border-gray-800 rounded px-4 py-2.5 text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-gray-700"
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block mb-2">Summary</label>
            <input
              type="text"
              placeholder="Optional"
              className="w-full bg-[#0f0f0f] border border-gray-800 rounded px-4 py-2.5 text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-gray-700"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2">Description</label>
            <textarea
              rows={4}
              className="w-full bg-[#0f0f0f] border border-gray-800 rounded px-4 py-2.5 text-gray-300 placeholder:text-gray-600 focus:outline-none focus:border-gray-700 resize-none"
            />
          </div>

          {/* Metadata Section */}
          <div>
            <button
              type="button"
              onClick={() => setMetadataOpen(!metadataOpen)}
              className="flex items-center gap-2 mb-4 text-gray-300 hover:text-white transition-colors"
            >
              {metadataOpen ? (
                <ChevronDown className="w-4 h-4" />
              ) : (
                <ChevronUp className="w-4 h-4" />
              )}
              Metadata (Optional)
            </button>

            {metadataOpen && (
              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-2">Project</label>
                    <input
                      type="text"
                      className="w-full bg-[#0f0f0f] border border-gray-800 rounded px-4 py-2.5 text-gray-300 focus:outline-none focus:border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Pillar</label>
                    <input
                      type="text"
                      className="w-full bg-[#0f0f0f] border border-gray-800 rounded px-4 py-2.5 text-gray-300 focus:outline-none focus:border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Assignee</label>
                    <input
                      type="text"
                      className="w-full bg-[#0f0f0f] border border-gray-800 rounded px-4 py-2.5 text-gray-300 focus:outline-none focus:border-gray-700"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block mb-2">Team</label>
                    <input
                      type="text"
                      className="w-full bg-[#0f0f0f] border border-gray-800 rounded px-4 py-2.5 text-gray-300 focus:outline-none focus:border-gray-700"
                    />
                  </div>
                  <div>
                    <label className="block mb-2">Fix Version</label>
                    <input
                      type="text"
                      className="w-full bg-[#0f0f0f] border border-gray-800 rounded px-4 py-2.5 text-gray-300 focus:outline-none focus:border-gray-700"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded transition-colors"
          >
            Analyze Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
