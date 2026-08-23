import { useState } from 'react';

export default function ProfileForm({ user, onUpdate }) {
  const [username, setUsername] = useState(user?.username || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({ username, bio });
    setSuccessMsg('Profile updated successfully!');
    setTimeout(() => setSuccessMsg(''), 3000);
  };

  return (
    <form onSubmit={handleSubmit} className="auth-form">
      <h3>User Profile</h3>
      {successMsg && <p className="form-success">{successMsg}</p>}

      <div className="form-group">
        <label>Username</label>
        <input 
          type="text" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
      </div>

      <div className="form-group">
        <label>Bio / Description</label>
        <textarea 
          value={bio} 
          onChange={(e) => setBio(e.target.value)} 
          rows="3"
        />
      </div>

      <button type="submit" className="form-submit-btn">Save Changes</button>
    </form>
  );
}