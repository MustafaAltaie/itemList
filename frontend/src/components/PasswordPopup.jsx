import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCheckPasswordMutation } from '../features/itemApi';

const PasswordPopup = ({ setAuthenticated }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [checkPassword] = useCheckPasswordMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await checkPassword({ password }).unwrap();

      if (res.result) {
        setAuthenticated(true);
        sessionStorage.setItem('authenticated', "true");
        navigate("/dashboard");
      } else {
        setError("Incorrect password. Please try again.");
      }
    } catch (err) {
      console.error("Error checking password:", err);
      setError("Server error. Please try again later.");
    }
  };

  return (
    <div className="popup-container">
      <div className="popup-content">
        <h2>Please Enter Password</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p style={{ color: "red" }}>{error}</p>}
          <button type="submit">Enter Dashboard</button>
        </form>
      </div>
    </div>
  );
};

export default PasswordPopup;