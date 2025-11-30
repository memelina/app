import React, { useState } from "react";

const RegisterForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    nume: '',
    prenume: '',
    email: '',
    telefon: ''
  });

  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.nume.trim()) {
      newErrors.nume = 'Numele este obligatoriu';
    }

    if (!formData.prenume.trim()) {
      newErrors.prenume = 'Prenumele este obligatoriu';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email-ul este obligatoriu';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email-ul nu este valid';
    }

    if (!formData.telefon.trim()) {
      newErrors.telefon = 'Numărul de telefon este obligatoriu';
    } else if (!/^[0-9+\-\s()]{10,}$/.test(formData.telefon)) {
      newErrors.telefon = 'Numărul de telefon nu este valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error când user începe să scrie
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };


  return (
    <div style={{
      minHeight: '100vh',
     backgroundColor: '#e41468',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Arial, sans-serif',
      padding: '20px'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        width: '100%',
        maxWidth: '500px'
      }}>
     
        
        <p style={{
          textAlign: 'center',
          color: '#666',
          marginBottom: '30px',
          fontSize: '1.1rem'
        }}>
          Completează formularul pentru a începe jocul
        </p>
        
        <form onSubmit={handleSubmit} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px'
        }}>
          {/* Nume */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{
              fontWeight: '600',
              color: '#333',
              fontSize: '0.9rem'
            }}>Nume *</label>
            <input
              type="text"
              name="nume"
              value={formData.nume}
              onChange={handleChange}
              placeholder="Introdu numele"
              style={{
                padding: '12px 16px',
                border: `2px solid ${errors.nume ? '#e74c3c' : '#e1e5e9'}`,
                borderRadius: '10px',
                fontSize: '1rem',
                background: errors.nume ? '#ffeaea' : '#f8f9fa',
                outline: 'none'
              }}
            />
            {errors.nume && <span style={{
              color: '#e74c3c',
              fontSize: '0.85rem'
            }}>{errors.nume}</span>}
          </div>

          {/* Prenume */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{
              fontWeight: '600',
              color: '#333',
              fontSize: '0.9rem'
            }}>Prenume *</label>
            <input
              type="text"
              name="prenume"
              value={formData.prenume}
              onChange={handleChange}
              placeholder="Introdu prenumele"
              style={{
                padding: '12px 16px',
                border: `2px solid ${errors.prenume ? '#e74c3c' : '#e1e5e9'}`,
                borderRadius: '10px',
                fontSize: '1rem',
                background: errors.prenume ? '#ffeaea' : '#f8f9fa',
                outline: 'none'
              }}
            />
            {errors.prenume && <span style={{
              color: '#e74c3c',
              fontSize: '0.85rem'
            }}>{errors.prenume}</span>}
          </div>

          {/* Email */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{
              fontWeight: '600',
              color: '#333',
              fontSize: '0.9rem'
            }}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="exemplu@email.com"
              style={{
                padding: '12px 16px',
                border: `2px solid ${errors.email ? '#e74c3c' : '#e1e5e9'}`,
                borderRadius: '10px',
                fontSize: '1rem',
                background: errors.email ? '#ffeaea' : '#f8f9fa',
                outline: 'none'
              }}
            />
            {errors.email && <span style={{
              color: '#e74c3c',
              fontSize: '0.85rem'
            }}>{errors.email}</span>}
          </div>

          {/* Telefon */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{
              fontWeight: '600',
              color: '#333',
              fontSize: '0.9rem'
            }}>Număr de telefon *</label>
            <input
              type="tel"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              placeholder="0712345678"
              style={{
                padding: '12px 16px',
                border: `2px solid ${errors.telefon ? '#e74c3c' : '#e1e5e9'}`,
                borderRadius: '10px',
                fontSize: '1rem',
                background: errors.telefon ? '#ffeaea' : '#f8f9fa',
                outline: 'none'
              }}
            />
            {errors.telefon && <span style={{
              color: '#e74c3c',
              fontSize: '0.85rem'
            }}>{errors.telefon}</span>}
          </div>

          {/* Submit Button */}
          <button 
            type="submit"
            disabled={loading}
            style={{
              background: loading ? '#ccc' : '#e41468',
              color: 'white',
              border: 'none',
              padding: '16px 32px',
              borderRadius: '10px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: loading ? 'not-allowed' : 'pointer',
              marginTop: '10px',
              opacity: loading ? 0.7 : 1
            }}
          >
            {loading ? 'Se salvează...' : 'Începe jocul'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;