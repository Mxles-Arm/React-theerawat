import { useState } from "react";

function XXXForm({ userInfo, login }) {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [region, setRegion] = useState("");
  const [comment, setComment] = useState("");
  const [accept, setAccept] = useState(false);

  // 🔒 ถ้ายังไม่ login ให้ขึ้นหน้าบอกและมีปุ่มให้ login
  if (!userInfo) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#80b5ea",
          padding: 24,
        }}
      >
        <div
          style={{
            background: "white",
            padding: "30px",
            borderRadius: "16px",
            boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
            width: "420px",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: 12 }}>TCT Form</h2>
          <p style={{ marginBottom: 18, color: "#555" }}>
            Please sign in to access this form.
          </p>

          <button type="button" onClick={login} style={buttonStyle}>
            Sign in with Google
          </button>
        </div>
      </div>
    );
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !lastName || !gender || !region || !accept) {
      alert("Please fill in all required fields.");
      return;
    }

    alert(`Form submitted with values:
First Name: ${name}
Last Name: ${lastName}
Gender: ${gender}
Region: ${region}
Comment: ${comment}
Accept: ${accept ? "Yes" : "No"}
`);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#b3cce6",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "white",
          padding: "30px",
          borderRadius: "16px",
          boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
          width: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>TCT Form</h2>

        {/* First Name */}
        <div style={{ marginBottom: "15px" }}>
          <label>First Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Last Name */}
        <div style={{ marginBottom: "15px" }}>
          <label>Last Name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Gender */}
        <div style={{ marginBottom: "15px" }}>
          <label>What is Gender</label>
          <div style={{ marginTop: "8px" }}>
            <label style={{ marginRight: 10 }}>
              <input
                type="radio"
                name="gender"
                value="Male"
                checked={gender === "Male"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Male
            </label>

            <label style={{ marginRight: 10 }}>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={gender === "Female"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Female
            </label>

            <label>
              <input
                type="radio"
                name="gender"
                value="Ninja"
                checked={gender === "Ninja"}
                onChange={(e) => setGender(e.target.value)}
              />{" "}
              Ninja
            </label>
          </div>
        </div>

        {/* Region */}
        <div style={{ marginBottom: "15px" }}>
          <label>Region</label>
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            style={inputStyle}
          >
            <option value="">-- Which region of the country are you from? --</option>
            <option value="Northern">Northern</option>
            <option value="Central">Central</option>
            <option value="Northeastern">Northeastern</option>
            <option value="Eastern">Eastern</option>
            <option value="Southern">Southern</option>
          </select>
        </div>

        {/* Comment */}
        <div style={{ marginBottom: "15px" }}>
          <label>Leave your comment</label>
          <textarea
            rows="4"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            style={{ ...inputStyle, resize: "none" }}
          ></textarea>
        </div>

        {/* Checkbox */}
        <div style={{ marginBottom: "20px" }}>
          <label>
            <input
              type="checkbox"
              checked={accept}
              onChange={(e) => setAccept(e.target.checked)}
            />{" "}
            I accept the terms and conditions
          </label>
        </div>

        <button type="submit" style={buttonStyle}>
          Send
        </button>
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "10px",
  marginTop: "6px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "14px",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  background: "#2563eb",
  color: "white",
  border: "none",
  borderRadius: "8px",
  fontSize: "16px",
  cursor: "pointer",
};

export default XXXForm;