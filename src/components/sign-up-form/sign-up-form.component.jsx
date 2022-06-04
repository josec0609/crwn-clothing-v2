import { useState } from 'react';
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../../utils/firebase/firebase.utils';

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: '',
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validate password fields match
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password);

      await createUserDocumentFromAuth({ ...user, displayName });

      setFormFields(defaultFormFields);
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        alert('Cannot create user, email already in use');
      } else {
        console.log('Create user fn encountered an error: ', err);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <div>
      <h1>Sign up with your email and password</h1>
      <form onSubmit={handleSubmit}>
        <label>Display name</label>
        <input
          type="text"
          required
          onChange={handleChange}
          name="displayName"
          value={displayName}
        />
        <label>Email</label>
        <input type="email" required onChange={handleChange} name="email" value={email} />
        <label>Password</label>
        <input type="password" required onChange={handleChange} name="password" value={password} />
        <label>Confirm password</label>
        <input
          type="password"
          required
          onChange={handleChange}
          name="confirmPassword"
          value={confirmPassword}
        />
        <button type="submit">Sign up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
