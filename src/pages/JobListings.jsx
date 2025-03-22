import { useState } from "react";

const jobs = [
  { id: 1, company: "Google", title: "Software Engineer", location: "Bangalore", description: "Develop scalable applications.", skills: "JavaScript, React, Node.js", salary: "₹25 LPA" },
  { id: 2, company: "Amazon", title: "Data Analyst", location: "Mumbai", description: "Analyze business data.", skills: "SQL, Python, Excel", salary: "₹18 LPA" },
  { id: 3, company: "Microsoft", title: "Cloud Engineer", location: "Hyderabad", description: "Manage cloud infrastructure.", skills: "Azure, Docker, Kubernetes", salary: "₹22 LPA" },
];

const JobListingsPage = () => {
  const [selectedJob, setSelectedJob] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadedResume, setUploadedResume] = useState(null);

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-100 p-4 overflow-auto">
        <h2 className="text-xl font-bold mb-4">Job Listings</h2>
        {jobs.map((job) => (
          <div
            key={job.id}
            className={`p-3 rounded cursor-pointer ${selectedJob?.id === job.id ? "bg-amber-200" : ""}`}
            onClick={() => setSelectedJob(job)}
          >
            <h3 className="font-bold">{job.company}</h3>
            <p>{job.title}</p>
            <p className="text-sm text-gray-500">{job.location}</p>
          </div>
        ))}
      </div>

      {/* Job Details */}
      <div className="flex-1 p-6 bg-white shadow-lg">
        {selectedJob ? (
          <>
            <h1 className="text-2xl font-bold">{selectedJob.title}</h1>
            <h2 className="text-lg text-gray-600">{selectedJob.company}</h2>
            <p className="mt-2 text-gray-500">Location: {selectedJob.location}</p>
            <p className="mt-2">{selectedJob.description}</p>
            <p className="mt-2"><strong>Required Skills:</strong> {selectedJob.skills}</p>
            <p className="mt-2"><strong>Salary:</strong> {selectedJob.salary}</p>
            <button
              className="mt-4 btn btn-primary"
              onClick={() => setIsModalOpen(true)}
            >
              Apply
            </button>
          </>
        ) : (
          <p className="text-center text-gray-500">Select a job from the list</p>
        )}
      </div>

      {/* Apply Modal */}
      {isModalOpen && selectedJob && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold">Apply for {selectedJob.title}?</h3>
            <input
              type="file"
              className="mt-4 p-2 border"
              onChange={(e) => setUploadedResume(e.target.files[0])}
            />
            <div className="mt-4 flex justify-between">
              <button
                className="btn btn-secondary"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              {uploadedResume && (
                <button className="btn btn-primary">Start Interview</button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobListingsPage;