import { GoLinkExternal } from "react-icons/go";

const UserCard = ({ user }) => {
  const joinedDate = new Date(user.created_at).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-bg-primary rounded-2xl border border-border p-6 mb-5 " id="user-card">
      <div className="text-center mb-4">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-25 h-25 rounded-full object-cover border-3 border-border mb-3 mx-auto"
        />

        <div className="text-lg font-bold text-text-primary mb-0.5">{user.name || user.login}</div>
        <div className="text-[13px] text-text-muted mb-2">@{user.login}</div>

        {user.bio && <p className="text-[13px] text-text-secondary leading-relaxed mb-4">{user.bio}</p>}

        <a
          href={user.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-5 py-2 bg-[#1a1a2e] text-white text-[13px] font-medium rounded-full no-underline transition-all duration-200 border-none cursor-pointer font-[inherit] mb-4 hover:bg-[#333] hover:-translate-y-px hover:shadow-md dark:bg-[#e6edf3] dark:text-[#161b22] dark:hover:bg-[#cdd5de]"
        >
          View on GitHub <GoLinkExternal size={14} />
        </a>
      </div>

      <div className="flex justify-center gap-4 pt-4 border-t border-border-light">
        <div className="text-center">
          <div className="text-lg font-bold text-text-primary">{user.followers}</div>
          <div className="text-[11px] text-text-muted uppercase tracking-wide">Followers</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-text-primary">{user.following}</div>
          <div className="text-[11px] text-text-muted uppercase tracking-wide">Following</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-text-primary">{user.public_repos}</div>
          <div className="text-[11px] text-text-muted uppercase tracking-wide">Repos</div>
        </div>
      </div>

      <div className="mt-3.5 text-xs text-text-muted text-center">Joined: {joinedDate}</div>
    </div>
  );
};

export default UserCard;