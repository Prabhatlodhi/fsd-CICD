const UserCard = ({ user }) => {
  return (
    <div className="user-card" data-testid="user-card">
      <div className="user-avatar">
        {user.name.charAt(0).toUpperCase()}
      </div>
      <div className="user-info">
        <h3 data-testid="user-name">{user.name}</h3>
        <p className="user-email" data-testid="user-email">{user.email}</p>
        <span className={`user-role ${user.role}`} data-testid="user-role">
          {user.role}
        </span>
      </div>
      <div className="user-date" data-testid="user-date">
        Joined: {new Date(user.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
};

export default UserCard;