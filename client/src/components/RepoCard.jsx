const RepoCard = ({ repo }) => {
  return (
    <div className="bg-slate-800 p-5 rounded-lg">
      <h3 className="text-xl font-bold mb-2">
        {repo.name}
      </h3>

      <p className="text-gray-400 mb-3">
        {repo.description}
      </p>

      <div className="flex flex-wrap gap-4 text-sm">
        <p>
          ⭐ {repo.stargazers_count}
        </p>

        <p>
          Language: {repo.language}
        </p>

        <p>
          Updated:
          {" "}
          {new Date(
            repo.updated_at
          ).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default RepoCard;