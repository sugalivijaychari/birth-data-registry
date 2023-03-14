import "./App.css";
import { useState } from "react";

function BirthData() {
  const [id, setUserId] = useState("");
  const [name, setUserName] = useState("");
  const [father, setUserFatherName] = useState("");
  const [gender, setUserGender] = useState("");
  const [hospital, setBirthHospitalName] = useState("");
  const [dateNtime, setBirthTimestamp] = useState("");
  const [place, setBirthPlace] = useState("");
  const [message, setMessage] = useState("");
  
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let res = await fetch("http://localhost:8080/api/addBirthData", {
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          userId: id,
          userName:name,
          userFatherName:father,
          userGender:gender,
          userHospitalName:hospital,
          userBirthTimestamp: dateNtime,
          userBirthPllace:place
        }),
      });
      let resJson = await res.json();
      if (res.status === 200) {
        setUserId("");
        setUserName("");
        setUserFatherName("");
        setUserGender("");
        setBirthHospitalName("");
        setBirthTimestamp("");
        setBirthPlace("");
        setMessage("User created successfully");
        console.log(resJson);
      } else {
        setMessage("Some error occured");
      }
      
    } catch (err) {
      console.log(err);
    }
  };
  

  return (
    <div className="App">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <label className="form-label">UserID:</label>
          <input
            type="text"
            value={id}
            placeholder="User ID"
            onChange={(e) => setUserId(e.target.value)}
          />
        
        
       
          <label className="form-label">User Name:</label>
          <input
            type="text"
            value={name}
            placeholder="User Name"
            onChange={(e) => setUserName(e.target.value)}
          />
        

        
          <label className="form-label">User Father Name:</label>
          <input
            type="text"
            value={father}
            placeholder="Father Name"
            onChange={(e) => setUserFatherName(e.target.value)}
          />
        
        
        
        
          <label className="form-label">User Gender:</label>
          <input
            type="text"
            value={gender}
            placeholder="Gender"
            onChange={(e) => setUserGender(e.target.value)}
          />
        
        
        
          <label className="form-label">Birth Hospital Name:</label>
          <input
            type="text"
            value={hospital}
            placeholder="Birth Hospital Name"
            onChange={(e) => setBirthHospitalName(e.target.value)}
          />
        
        
        
          <label className="form-label">Birth Date and Time:</label>
          <input
            type="text"
            value={dateNtime}
            placeholder="Birth Date and Time"
            onChange={(e) => setBirthTimestamp(e.target.value)}
          />
        
        
        
          <label className="form-label">Birth Place:</label>
          <input
            type="text"
            value={place}
            placeholder="Birth place"
            onChange={(e) => setBirthPlace(e.target.value)}
          />
        </div>
        

        <button type="submit" className="form-submit">Create Birth Data</button>

        <div className="message">{message ? <p>{message}</p> : null}</div>
      </form>
    </div>
  );
}

export default BirthData;
