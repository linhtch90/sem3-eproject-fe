import { useState } from 'react';

import styles from '../css/Feedback.module.css';

function Feedback() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');

  const [errorFirstName, setErrorFirstName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorContent, setErrorContent] = useState('');

  function handleFirstName(e) {
    setFirstName(e.target.value);
  }

  function handleLastName(e) {
    setLastName(e.target.value);
  }

  function handleEmail(e) {
    setEmail(e.target.value);
  }

  function handleContent(e) {
    setContent(e.target.value);
  }

  function validateForm(e) {
    e.preventDefault();

    let regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
    if (!firstName) {
      setErrorFirstName(" Let's enter user name !");
    }
    if (!lastName) {
      setErrorLastName(" Let's enter last name !'");
    }
    if (!email) {
      setErrorEmail(" Let's enter email !");
    } else if (!email.trim().match(regex)) {
      setErrorEmail('Email not validator !');
    }
    if (!content) {
      setErrorContent("Let's enter content !");
    }
  }

  function inputFirstName() {
    setErrorFirstName('');
  }

  function inputLastName() {
    setErrorLastName('');
  }

  function inputEmail() {
    setErrorEmail('');
  }

  function inputContent() {
    setErrorContent('');
  }

  function blurFirstName() {
    if (!firstName) {
      setErrorFirstName(" Let's enter user name !");
    }
  }

  function blurLastName() {
    if (!lastName) {
      setErrorLastName(" Let's enter last name !'");
    }
  }

  function blurEmail() {
    let regex = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;

    if (!email) {
      setErrorEmail(" Let's enter email !");
    } else if (!email.trim().match(regex)) {
      setErrorEmail('Email not validator !');
    }
  }

  function blurContent() {
    if (!content) {
      setErrorContent("Let's enter content !");
    }
  }

  return (
    <>
      <div className={styles.Container}>
        <div className={styles.Feedback}>
          <h1 className={styles.Title}>Feedback</h1>
          <div className={styles.Feedback__history}>
            <div className={styles.Feedback__item}>
              <div className={styles.Feedback__item__header}>
                <h5> User Name </h5>
                <p>Email : abc@gmail.com</p>
                <p>date : </p>
              </div>
              <div className={styles.Feedback__item__content}>
                <p>Learn about business opportunities and related investment business immigration programs.</p>
              </div>
            </div>
            <div className={styles.Feedback__item}>
              <div className={styles.Feedback__item__header}>
                <h5> User Name </h5>
                <p>Email : abc@gmail.com</p>
                <p>date : </p>
              </div>
              <div className={styles.Feedback__item__content}>
                <p>Learn about business opportunities and related investment business immigration programs.</p>
              </div>
            </div>
            <div className={styles.Feedback__item}>
              <div className={styles.Feedback__item__header}>
                <h5> User Name </h5>
                <p>Email : abc@gmail.com</p>
                <p>date : </p>
              </div>
              <div className={styles.Feedback__item__content}>
                <p>Learn about business opportunities and related investment business immigration programs.</p>
              </div>
            </div>
            <div className={styles.Feedback__item}>
              <div className={styles.Feedback__item__header}>
                <h5> User Name </h5>
                <p>Email : abc@gmail.com</p>
                <p>date : </p>
              </div>
              <div className={styles.Feedback__item__content}>
                <p>Learn about business opportunities and related investment business immigration programs.</p>
              </div>
            </div>
          </div>
          <div className={styles.separator}></div>
          <div className={styles.Feedback__form}>
            <h2 className={styles.title__form}> Form Feedback</h2>
            <div className={styles.form__feedback}>
              <form action="" className={styles.form1} onSubmit={validateForm}>
                <div className={styles.form__group}>
                  <div className={styles.form__label}>
                    <label> First Name</label>
                  </div>
                  <div className={styles.form__input}>
                    <input
                      onBlur={blurFirstName}
                      onInput={inputFirstName}
                      value={firstName}
                      onChange={handleFirstName}
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                {errorFirstName && <p className={styles.errorMessage}>{errorFirstName}</p>}
                <div className={styles.form__group}>
                  <div className={styles.form__label}>
                    <label> Last Name</label>
                  </div>
                  <div className={styles.form__input}>
                    <input
                      onBlur={blurLastName}
                      onInput={inputLastName}
                      value={lastName}
                      onChange={handleLastName}
                      type="text"
                      placeholder="Last Name"
                    />
                  </div>
                </div>
                {errorLastName && <p className={styles.errorMessage}>{errorLastName}</p>}
                <div className={styles.form__group}>
                  <div className={styles.form__label}>
                    <label> Email </label>
                  </div>
                  <div className={styles.form__input}>
                    <input
                      onInput={inputEmail}
                      onBlur={blurEmail}
                      value={email}
                      onChange={handleEmail}
                      type="text"
                      placeholder="First Name"
                    />
                  </div>
                </div>
                {errorEmail && <p className={styles.errorMessage}>{errorEmail}</p>}
                <div className={styles.form__group}>
                  <div className={styles.form__label}>
                    <label> Nội dung </label>
                  </div>
                  <div className={styles.form__input}>
                    <textarea
                      onBlur={blurContent}
                      onInput={inputContent}
                      value={content}
                      onChange={handleContent}
                      name=""
                      id=""
                      cols="30"
                      rows="10"
                      placeholder="Nội dung"
                    ></textarea>
                  </div>
                </div>
                {errorContent && <p className={styles.errorContent}>{errorContent}</p>}
                <button type="submit"> Submit </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Feedback;
