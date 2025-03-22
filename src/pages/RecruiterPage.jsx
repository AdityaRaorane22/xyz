import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const RecruiterPage = () => {
  const [jobs, setJobs] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "", description: "", skills: "", salary: "", location: "", tags: "" });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch jobs from the correct backend
    fetch("http://localhost:5000/api/jobs")
      .then((res) => res.json())
      .then((data) => setJobs(data));
  }, []);

  const handlePostJob = () => {
    fetch("http://localhost:5000/api/jobs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((newJob) => setJobs([...jobs, newJob])) 
      .catch((err) => console.error("Error posting job:", err));

    setShowForm(false);
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-4">Welcome to Hire360</h1>
      <p className="text-center text-gray-400 mb-6">Take recruitment to the next level with AI-powered interviews.</p>

      {/* Post Job Button */}
      <button className="btn btn-primary bg-rose-500 w-50 block mx-auto" onClick={() => setShowForm(true)}>
        Post a Job
      </button>

      {/* Job Posting Modal */}
      {showForm && (
        <dialog open className="modal">
          <div className="modal-box border p-6 rounded-lg">
            <h2 className="text-xl font-bold mb-3">Post a Job</h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Job Title"
                className="input input-bordered w-full"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
              <textarea
                placeholder="Job Description"
                className="textarea textarea-bordered w-full"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
              <input
                type="text"
                placeholder="Required Skills"
                className="input input-bordered w-full"
                value={formData.skills}
                onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
              />
              <input
                type="text"
                placeholder="Salary"
                className="input input-bordered w-full"
                value={formData.salary}
                onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
              />
              <input
                type="text"
                placeholder="Location"
                className="input input-bordered w-full"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              />
              <input
                type="text"
                placeholder="Job Tags (comma-separated)"
                className="input input-bordered w-full"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
              />
            </div>

            <div className="modal-action">
              <button className="btn btn-success w-[50%]" onClick={handlePostJob}>
                Submit
              </button>
              <button className="btn btn-error w-[50%]" onClick={() => setShowForm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Posted Jobs List */}
      <h2 className="text-2xl font-semibold mt-8 mb-4 mx-15">Posted Jobs</h2>
      <div className="space-y-4 mx-15">
        {jobs.map((job) => (
          <div key={job._id} className="card bg-gray-800 p-4 shadow-md">
            <div className="card-body">
              <h2 className="card-title">{job.title}</h2>
              <p className="text-gray-400">{job.location} | {job.salary}</p> 
              <p className="text-gray-400">{job.description}</p>
              <button className="btn btn-info bg-rose-400" onClick={() => navigate(`/job/${job._id}`)}>
                View Applicants
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecruiterPage;
