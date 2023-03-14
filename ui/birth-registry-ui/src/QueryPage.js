import React, { useState } from "react";

function QueryForm({ handleQuery }) {
  const [userId, setUserId] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    handleQuery(userId);
  };

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <label className="form-label">User ID:</label>
          <input
            type="text"
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
        </div>
        <button type="submit" className="form-submit">Query</button>
      </form>
    </div>
    
  );
}

function UserCard({ user }) {
  console.log("user is:\t", user)
  return (
    <div className="userInfo">
  <h1 >User Details:</h1>
  <table>
    <tbody>
      <tr>
        <td>User Name:</td>
        <td>{user.name}</td>
      </tr>
      <tr>
        <td>User Father Name:</td>
        <td>{user.fatherName}</td>
      </tr>
      <tr>
        <td>User Gender:</td>
        <td>{user.gender}</td>
      </tr>
      <tr>
        <td>User Hospital Name:</td>
        <td>{user.hospitalName}</td>
      </tr>
      <tr>
        <td>User Birth Timestamp:</td>
        <td>{user.timestamp}</td>
      </tr>
      <tr>
        <td>User Birth Place:</td>
        <td>{user.place}</td>
      </tr>
    </tbody>
  </table>
</div>

  );
}

function QueryPage() {
  const [user, setUser] = useState(null);

  let handleQuery = async (userId) => {
    try {
      let res = await fetch("http://localhost:8080/api/queryBirthData", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: userId
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        const userData = JSON.parse(resJson.response);
        console.log(JSON.parse(resJson.response))
        setUser(userData);
      } else {
        console.log("Some error occured")
      }
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <QueryForm handleQuery={handleQuery} />
      {user && <UserCard user={user} />}
    </div>
  );
}

export default QueryPage;
