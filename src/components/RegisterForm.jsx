import React, { useState } from "react";
import { db } from "./db.js"; // Dexie DB import

const RegisterForm = ({ onSubmit, loading }) => {
const [formData, setFormData] = useState({
nume: "",
prenume: "",
email: "",
telefon: "",
magazin: "", // nou
});
const [errors, setErrors] = useState({});

const validateForm = () => {
const newErrors = {};
if (!formData.nume.trim()) newErrors.nume = "Numele este obligatoriu";
if (!formData.prenume.trim()) newErrors.prenume = "Prenumele este obligatoriu";

if (!formData.email.trim()) newErrors.email = "Email-ul este obligatoriu";
else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email invalid";

if (!formData.telefon.trim()) newErrors.telefon = "Telefon obligatoriu";
else if (!/^[0-9+\-\s()]{10,15}$/.test(formData.telefon))
  newErrors.telefon = "Număr invalid";

if (!formData.magazin.trim()) newErrors.magazin = "Magazinul este obligatoriu";

setErrors(newErrors);
return Object.keys(newErrors).length === 0;


};

const handleChange = (e) => {
const { name, value } = e.target;
setFormData(prev => ({ ...prev, [name]: value }));
if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
};

const handleSubmit = async (e) => {
e.preventDefault();


if (!validateForm()) return;

// Verificare email duplicat în Dexie
const existing = await db.players.where("email").equals(formData.email).first();
if (existing) {
  setErrors(prev => ({ ...prev, email: "Acest email există deja" }));
  return;
}

// Trimite formularul mai departe
onSubmit(formData);


};

return (
<div style={{
minHeight: "100vh",
backgroundColor: "#cc2632",
display: "flex",
alignItems: "center",
justifyContent: "center",
padding: "20px",
}}>
<div style={{
background: "white",
borderRadius: "20px",
padding: "40px",
boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
width: "100%",
maxWidth: "500px",
}}>
<p style={{
textAlign: "center",
color: "#666",
marginBottom: "30px",
fontSize: "1.1rem",
}}>
Completează formularul pentru a începe jocul </p>

    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      {["nume", "prenume", "email", "telefon", "magazin"].map(field => (
        <div key={field} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <label style={{ fontWeight: "600", color: "#333", fontSize: "0.9rem" }}>
            {field === "magazin"
              ? "Magazinul din care ați făcut cumpărături *"
              : field.charAt(0).toUpperCase() + field.slice(1) + " *"}
          </label>
          <input
            type="text"
            name={field}
            value={formData[field]}
            onChange={handleChange}
            placeholder={`Introdu ${field}`}
            style={{
              padding: "12px 16px",
              border: `2px solid ${errors[field] ? "#cc2632" : "#e1e5e9"}`,
              borderRadius: "10px",
              fontSize: "1rem",
              background: errors[field] ? "#ffeaea" : "#f8f9fa",
              outline: "none",
            }}
          />
          {errors[field] && (
            <span style={{ color: "#cc2632", fontSize: "0.85rem" }}>
              {errors[field]}
            </span>
          )}
        </div>
      ))}

      <button type="submit" disabled={loading} style={{
        background: loading ? "#ccc" : "#cc2632",
        color: "white",
        border: "none",
        padding: "16px 32px",
        borderRadius: "10px",
        fontSize: "1.1rem",
        fontWeight: "600",
        cursor: loading ? "not-allowed" : "pointer",
        marginTop: "10px",
        opacity: loading ? 0.7 : 1,
      }}>
        {loading ? "Se salvează..." : "Începe jocul"}
      </button>
    </form>
  </div>
</div>


);
};

export default RegisterForm;
