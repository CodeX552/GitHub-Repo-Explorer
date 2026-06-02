import RepoCard from "./RepoCard";

const RepoList = ({ repos }) => {
  return (
    <div className="grid md:grid-cols-2 gap-5 max-w-6xl mx-auto">
      {repos.map((repo) => (
        <RepoCard
          key={repo.id}
          repo={repo}
        />
      ))}
    </div>
  );
};

export default RepoList;