import { useState } from 'react';

const UserForm = ({ onUserAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await onUserAdded(formData);
      setFormData({ name: '', email: '' }); // Clear form
    } catch (error) {
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="user-form-container" data-testid="user-form">
      <h3>Add New User</h3>
      <form onSubmit={handleSubmit} className="user-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter name"
            required
            data-testid="name-input"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            required
            data-testid="email-input"
          />
        </div>
        
        <button 
          type="submit" 
          disabled={isSubmitting}
          className="submit-btn"
          data-testid="submit-button"
        >
          {isSubmitting ? 'Adding...' : 'Add User'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;