import { useState } from 'react';
import { createFromIconfontCN } from '@ant-design/icons';
import { Space } from 'antd';

import styles from '../css/Register.module.css';
function Register() {
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rePassword, setRePassword] = useState('');

  const [ValidateUserName, SetValidateUserName] = useState('');
  const [ValidateEmail, setValidateEmail] = useState('');
  const [ValidatePassword, setValidatePassword] = useState('');
  const [ValidateRePassword, setValidateRePassword] = useState('');

  function handleUserName(e) {
    setUserName(e.target.value);
  }
  function handleEmail(e) {
    setEmail(e.target.value);
  }
  function handlePassword(e) {
    setPassword(e.target.value);
  }
  function handleRePassword(e) {
    setRePassword(e.target.value);
  }

  function HandleSubmitForm(e) {
    e.preventDefault();
    let regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if (!userName) {
      SetValidateUserName('Vui lòng nhập tên người dùng !');
    }
    if (!email) {
      setValidateEmail('Vui lòng nhập Email của bạn !');
    } else if (!email.trim().match(regex)) {
      setValidateEmail('Email không hợp lệ !');
    }

    if (!password) {
      setValidatePassword('Vui lòng nhập mật khẩu !');
    } else if (password.length < 6) {
      setValidatePassword('Mật khẩu phải lớn hơn 6 ký tự !');
    }

    if (!rePassword) {
      setValidateRePassword('Vui lòng nhập lại mật khẩu !');
    } else if (password !== rePassword) {
      setValidateRePassword('Xác nhận mật khẩu không đúng !');
    }

    console.log(userName, email, password, rePassword);
  }

  function handleBlurInputUserName() {
    if (!userName) {
      SetValidateUserName('Vui lòng nhập tên người dùng !');
    }
  }
  function handleOnInputUserName() {
    SetValidateUserName(' ');
  }
  function handleOnInputEmail() {
    setValidateEmail(' ');
  }

  function handleBlurEmail() {
    let regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email) {
      setValidateEmail('Bạn vui lòng nhập Email !');
    } else if (!email.match(regex)) {
      setValidateEmail('Email của bạn không hợp lệ !');
    }
  }

  function handleOnInputPassword() {
    setValidatePassword(' ');
  }

  function handleBlurPassword() {
    if (!password) {
      setValidatePassword('Vui lòng nhập mật khẩu ! ');
    } else if (password.length < 6) {
      setValidatePassword('Mật khẩu phải lớn hơn 6 ký tự ! ');
    }
  }

  function handleOnInputRePassword() {
    setValidateRePassword(' ');
  }

  function handleBlurRePassword() {
    if (!rePassword) {
      setValidateRePassword('Vui lòng nhâp trường này !');
    } else if (password !== rePassword) {
      setValidateRePassword('Xác nhận lại mật khẩu không đúng !');
    }
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.screen}>
          <div className={styles.screen__content}>
            <form className={styles.form_register} method="post" action="" onSubmit={HandleSubmitForm}>
              <div className={styles.form_group}>
                <input
                  name={styles.userName}
                  onInput={handleOnInputUserName}
                  onBlur={handleBlurInputUserName}
                  onChange={handleUserName}
                  value={userName}
                  type="text"
                  className={styles.form__input}
                  placeholder="User Name"
                />
                <span className={styles.form_message}>{ValidateUserName}</span>
              </div>
              <div className={styles.form_group}>
                <input
                  name="email"
                  onChange={handleEmail}
                  value={email}
                  onInput={handleOnInputEmail}
                  onBlur={handleBlurEmail}
                  type="text"
                  className={styles.form__input}
                  placeholder="Email"
                />
                <span className={styles.form_message}> {ValidateEmail}</span>
              </div>
              <div className={styles.form_group}>
                <input
                  name="password"
                  onChange={handlePassword}
                  onInput={handleOnInputPassword}
                  onBlur={handleBlurPassword}
                  value={password}
                  type="password"
                  className={styles.form__input}
                  placeholder="Password"
                />
                <span className={styles.form_message}> {ValidatePassword}</span>
              </div>
              <div className={styles.form_group}>
                <input
                  onChange={handleRePassword}
                  name="rePassword"
                  onInput={handleOnInputRePassword}
                  onBlur={handleBlurRePassword}
                  value={rePassword}
                  type="password"
                  className={styles.form__input}
                  placeholder="Re-Password"
                />
                <span className={styles.form_message}> {ValidateRePassword}</span>
              </div>
              <button type="submit" className={`${styles.btn}  ${styles.btn__submit}`}>
                <span className={styles.btn__text}>Register Now</span>
              </button>
            </form>
          </div>
          <div className={styles.screen__background}>
            <span className={`${styles.screen__background__shape} ${styles.screen__background__shape4}`}></span>
            <span className={`$styles.screen__background__shape} ${styles.screen__background__shape3}`}></span>
            <span className={`${styles.screen__background__shape} ${styles.screen__background__shape2}`}></span>
            <span className={`${styles.screen__background__shape} ${styles.screen__background__shape1}`}></span>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
