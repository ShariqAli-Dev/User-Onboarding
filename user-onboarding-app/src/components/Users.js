export default function Users({ users }) {
  return (
    <div className="user-container">
      {users.map((user) => {
        if (!user) {
          return <h2>Fetching user...</h2>;
        }
        return (
          <div id={!user.name ? user.first_name : user.name} key={user.name}>
            {!user.name ? <h1>{user.first_name}</h1> : <h2>{user.name}</h2>}
            <p>Email: {user.email}</p>
            <p>User {user.agreeToTerms ? "Did" : "Didn't"} Agree To Terms</p>
          </div>
        );
      })}
    </div>
  );
}
