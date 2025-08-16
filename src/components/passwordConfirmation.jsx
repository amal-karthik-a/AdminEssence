import React, { useState } from 'react';
import { X } from 'lucide-react';
import { supabase } from './../../SupaBase/supa'; // update path as needed
import './../styles/Home.css';

const AdminAuthModal = ({ isOpen, onClose, onAuthResult }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handlePasswordCheck = async () => {
    setError('');
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      setError("User not found.");
      onAuthResult(false);
      return;
    }

    const { email } = user;

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError("Incorrect password.");
      onAuthResult(false);
    } else {
      onAuthResult(true);
    }
    setPassword("");
  };

  return (
    <div className="coco-dashboard-modal-overlay">
      <div className="coco-dashboard-modal" style={{ maxWidth: "500px" }}>
        <div className="coco-dashboard-modal-header">
          <h3>Admin Authentication</h3>
          <button className="coco-dashboard-modal-close" onClick={onClose}>
            <X size={20} />
          </button>
        </div>
        <div className="coco-dashboard-modal-content">
          <div className="coco-dashboard-form-group">
            <label>Enter the Password *</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
            
            <button onClick={handlePasswordCheck} className="coco-dashboard-add-btn" style={{textAlign: 'center !important'}}>
                Verify
            </button>
          </div>
          {error && <p style={{ color: 'red', marginTop: '8px' }}>{error}</p>}
        </div>
      </div>
    </div>
  );
};

export default AdminAuthModal;