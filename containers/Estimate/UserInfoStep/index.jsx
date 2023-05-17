import { useState } from 'react';

import styles from './styles.module.scss';

const UserInfoStep = () => {
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
  });

  const handleChange = ({ name, value }) => {
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit = e => {
    e.preventDefault();
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='firstName'
          placeholder='First name'
          value={userInfo.firstName}
          onChange={handleChange}
          required
        />

        <input
          type='text'
          name='lastName'
          placeholder='Last name'
          value={userInfo.lastName}
          onChange={handleChange}
          required
        />

        <input
          type='email'
          name='email'
          placeholder='Email address'
          value={userInfo.email}
          onChange={handleChange}
          required
        />

        <button type='submit'>Continue</button>
      </form>
    </div>
  );
};

export default UserInfoStep;
