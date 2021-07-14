export default function Users({ users }) {
  return (
    <div className="user-container">
      {users.map((user) => {
        if (!user) {
          return <h2>Fetching user...</h2>;
        }
        return (
          <div key={user.name}>
            {!user.name ? <h1>{user.first_name}</h1> : <h2>{user.name}</h2>}
            <p>Email: {user.email}</p>
            <h3>{user.agreeToTerms}</h3>
          </div>
        );
      })}
    </div>
  );
}
