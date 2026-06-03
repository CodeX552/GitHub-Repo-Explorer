import { useState } from "react";
import { GoLinkExternal, GoChevronDown } from "react-icons/go";
import { getLanguageColor } from "./LanguagesCard";

const RepoCard = ({ repo }) => {
  const [expanded, setExpanded] = useState(false);
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
    <div 
      className="group bg-bg-primary border border-border rounded-xl px-6 py-5 mb-3 transition-all duration-200 relative cursor-pointer hover:border-accent hover:shadow-md hover:-translate-y-px" 
      onClick={() => setExpanded(!expanded)}
      id={`repo-${repo.id}`}
    >
      <div className="flex items-start justify-between mb-1.5">
        <div className="flex-1">
          <a
            href={repo.html_url}
            target="_blank"
            className="text-[15px] font-semibold text-text-primary no-underline break-words hover:text-accent"
            onClick={(e) => e.stopPropagation()}
          >
            {repo.name}
          </a>

          {repo.visibility && (
            <span className="text-[11px] font-medium text-text-muted border border-border px-2.5 py-0.5 rounded-full whitespace-nowrap ml-2">
              {repo.visibility === "public" ? "Public" : "Private"}
            </span>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0 ml-3">
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-text-muted transition-colors duration-200 hover:text-accent"
            aria-label="Open repository"
            onClick={(e) => e.stopPropagation()}
          >
            <GoLinkExternal size={16} />
          </a>
          <GoChevronDown 
            size={18} 
            className={`text-text-muted transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} 
          />
        </div>
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

        <span className="ml-auto text-xs text-text-muted">{timeAgo(repo.updated_at)}</span>
      </div>

      <div 
        className={`grid transition-all duration-300 ease-in-out ${expanded ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"}`}
      >
        <div className="overflow-hidden">
          <div 
            className="bg-bg-secondary p-4 rounded-xl border border-border cursor-default" 
            onClick={(e) => e.stopPropagation()}
          >
            <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-sm text-text-secondary max-md:grid-cols-1">
              <div className="flex items-center gap-2">
                 <span className="text-text-primary font-medium">Stars:</span> {repo.stargazers_count}
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-text-primary font-medium">Forks:</span> {repo.forks_count}
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-text-primary font-medium">Open Issues:</span> {repo.open_issues_count}
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-text-primary font-medium">Default Branch:</span> {repo.default_branch}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-text-primary font-medium">Watchers:</span> {repo.watchers_count}
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-text-primary font-medium">Size:</span> {(repo.size / 1024).toFixed(2)} MB
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RepoCard;