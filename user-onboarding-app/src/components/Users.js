export default function Users({ users }) {
  return (
    <div className="user-container">
      {users.map((user) => {
        return <div key={user.name}>{user.name ? <h1>{user.name}</h1> : <h1>{user.first_name}</h1>}</div>;
      })}
    </div>
  );
}
