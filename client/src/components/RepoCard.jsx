import { GoStar, GoRepoForked, GoLinkExternal } from "react-icons/go";
import { getLanguageColor } from "./LanguagesCard";

const RepoCard = ({ repo }) => {
  const timeAgo = (dateStr) => {
    const now = new Date();
    const date = new Date(dateStr);
    const diffMs = now - date;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "today";
    if (diffDays === 1) return "1 day ago";
    if (diffDays < 30) return `${diffDays} days ago`;
    if (diffDays < 365) {
      const months = Math.floor(diffDays / 30);
      return months === 1 ? "1 mon ago" : `${months} mon ago`;
    }
    const years = Math.floor(diffDays / 365);
    return years === 1 ? "1 year ago" : `${years} years ago`;
  };

  return (
    <div className="group bg-bg-primary border border-border rounded-xl px-6 py-5 mb-3 transition-all duration-200 relative hover:border-accent hover:shadow-md hover:-translate-y-px" id={`repo-${repo.id}`}>
      <div className="flex items-start justify-between mb-1.5">
        <div className="flex-1">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[15px] font-semibold text-text-primary no-underline break-words hover:text-accent"
          >
            {repo.name}
          </a>

          {repo.visibility && (
            <span className="text-[11px] font-medium text-text-muted border border-border px-2.5 py-0.5 rounded-full whitespace-nowrap ml-2">
              {repo.visibility === "public" ? "Public" : "Private"}
            </span>
          )}
        </div>

        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-text-muted shrink-0 ml-3 transition-colors duration-200 group-hover:text-accent"
          aria-label="Open repository"
        >
          <GoLinkExternal size={16} />
        </a>
      </div>

      {repo.description && (
        <p className="text-[13px] text-text-secondary mb-3 leading-relaxed line-clamp-2">{repo.description}</p>
      )}

      {repo.topics && repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {repo.topics.slice(0, 4).map((topic) => (
            <span key={topic} className="text-[11px] font-medium text-accent bg-accent-light px-2.5 py-0.5 rounded-full">
              {topic}
            </span>
          ))}
        </div>
      )}

      <div className="flex items-center flex-wrap gap-4 text-xs text-text-muted">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: getLanguageColor(repo.language) }}
            />
            {repo.language}
          </span>
        )}

        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1.5">
            <GoStar size={14} />
            {repo.stargazers_count}
          </span>
        )}

        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1.5">
            <GoRepoForked size={14} />
            {repo.forks_count}
          </span>
        )}

        <span className="ml-auto text-xs text-text-muted">{timeAgo(repo.updated_at)}</span>
      </div>
    </div>
  );
};

export default RepoCard;