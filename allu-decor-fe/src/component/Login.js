import { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});
import { createFromIconfontCN } from '@ant-design/icons';
import { Space } from 'antd';

import styles from '../css/Login.module.css';

function Login() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [validateUserName, setValidateUserName] = useState('');
  const [validatePassword, setValidatePassword] = useState('');
  const [error, setError] = useState('');

  function handleUserName(e) {
    setUserName(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }

  function ValidateForm(e) {
    e.preventDefault();
    if (!userName) {
      setValidateUserName('Vui lòng nhập tên đăng nhập ! ');
    }
    if (!password) {
      setValidatePassword('Vui lòng nhập mật khẩu !');
    }
  }

  function InputUserName() {
    setValidateUserName(' ');
    setError(' ');
  }

  function BlurUserName() {
    if (!userName) {
      setError('invalid');
      setValidateUserName('Bạn chưa điền tên đăng nhập ! ');
    }
  }

  function InputPassword() {
    setValidatePassword(' ');
    setError(' ');
  }
  function BlurPassword() {
    if (!password) {
      setError('invalid');
      setValidatePassword(' Bạn chưa nhập mật khẩu ! ');
    } else if (password.length < 6) {
      setError('invalid');
      setValidatePassword('Mật khẩu phải lớn hơn 6 kí tự !');
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.screen}>
          <div className={styles.screen__content}>
            <form className={styles.form_login} onSubmit={ValidateForm}>
              <div className={styles.form_group}>
                <UserOutlined className={styles.icon_input} />
                <input
                  name="userName"
                  type="text"
                  className={styles.form__input}
                  placeholder="User name / Email"
                  onChange={handleUserName}
                  value={userName}
                  onInput={InputUserName}
                  onBlur={BlurUserName}
                />
                <span className={error}>{validateUserName}</span>
              </div>
              <div className={styles.form_group}>
                <LockOutlined />
                <input
                  onChange={handlePassword}
                  value={password}
                  onInput={InputPassword}
                  onBlur={BlurPassword}
                  name="password"
                  type="password"
                  className={styles.form__input}
                  placeholder="Password"
                />
                <span className={error}>{validatePassword}</span>
              </div>
              <span className={styles.form_message}></span>
              <button type="submit" className={`${styles.btn} ${styles.btn__submit}`}>
                <span className={styles.btn__text}>Log In Now</span>
              </button>
            </form>
            <div className={styles.shopName}>
              <h3>Login Alludecore </h3>
            </div>
          </div>
          <div className={styles.screen__background}>
            <span className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`}></span>
            <span className={`${styles.screen__background__shape} ${styles.screen__background__shape3}`}></span>
            <span className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`}></span>
            <span className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`}></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
