const UserCard = ({ user }) => {
  return (
    <div className="bg-slate-800 p-6 rounded-lg max-w-3xl mx-auto mb-8">
      <div className="flex gap-6 items-center">
        <img
          src={user.avatar_url}
          alt={user.login}
          className="w-28 rounded-full"
        />

        <div>
          <h2 className="text-2xl font-bold">
            {user.name || user.login}
          </h2>

          {user.bio && (
            <p className="text-gray-400">{user.bio}</p>
          )}

          <div className="flex gap-6 mt-4">
            <p>
              Followers: {user.followers}
            </p>

            <p>
              Following: {user.following}
            </p>

            <p>
              Repos: {user.public_repos}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserCard;