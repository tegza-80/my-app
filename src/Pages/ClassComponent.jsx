import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';

class ClassComponent extends Component {
  state = {
    firstName: '',
    lastName: '',
    age: '',
    savedData: null,
  };

  //Проверка данных
  isValid = () => {
    const { firstName, lastName, age } = this.state;
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z]+$/;
    return (
      nameRegex.test(firstName.trim()) &&
      nameRegex.test(lastName.trim()) &&
      age.trim() !== '' &&
      /^\d+$/.test(age) &&
      Number(age) >= 0
    );
  };

  //Обработка изменения полей
  handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'firstName' || name === 'lastName') {
      if (/^[а-яА-ЯёЁa-zA-Z]*$/.test(value)) {
        this.setState({ [name]: value });
      }
    } else if (name === 'age') {
      if (/^\d*$/.test(value)) {
        this.setState({ [name]: value });
      }
    }
  };

  //Сохранение данных
  handleSave = (e) => {
    e.preventDefault();
    if (this.isValid()) {
      const { firstName, lastName, age } = this.state;
      this.setState({
        savedData: { firstName, lastName, age },
        firstName: '',
        lastName: '',
        age: '',
      });
    }
  };

  handleGoHome = () => {
    window.location.href = '/';
  };

  
  //Отрисовка
  render() {
    const { firstName, lastName, age, savedData } = this.state;
    const valid = this.isValid();

    const rowStyle = {
      display: 'flex',
      alignItems: 'center',
      marginBottom: 10,
    };

    const labelStyle = {
      width: 80, 
      marginRight: 10,
      textAlign: 'right',
    };

    const submitButtonStyle = {
      marginTop: 10,
      padding: '6px 12px',
      cursor: valid ? 'pointer' : 'not-allowed',
      backgroundColor: valid ? 'green' : 'red',
      color: 'white',
      border: 'none',
      borderRadius: 4,
      transition: 'background-color 0.3s',
    };

    const homeButtonStyle = {
      marginLeft: 10,
      padding: '6px 12px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      transition: 'background-color 0.3s',
    };

    return (
      <div style={{ padding: 20 }}>
        <form onSubmit={this.handleSave} style={{ marginBottom: 20 }}>
          <div style={rowStyle}>
            <label style={labelStyle} htmlFor="firstName">Имя</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
              required
              autoFocus
            />
            {savedData && (
            <div style={{ marginTop: 5 }}>
              Последнее имя: <b>{savedData.firstName}</b>
            </div>
          )}
          </div>
          <div style={rowStyle}>
            <label style={labelStyle} htmlFor="lastName">Фамилия</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
              required
            />
            {savedData && (
            <div style={{ marginTop: 5 }}>
              Последняя фамилия: <b>{savedData.lastName}</b>
            </div>
          )}
          </div>
          <div style={rowStyle}>
            <label style={labelStyle} htmlFor="age">Лет</label>
            <input
              type="text"
              id="age"
              name="age"
              value={age}
              onChange={this.handleChange}
              required
            />
            {savedData && (
            <div style={{ marginTop: 5 }}>
              Последний возраст: <b>{savedData.age}</b>
            </div>
          )}
          </div>
          <button type="submit" disabled={!valid} style={submitButtonStyle}>
            Отправить
          </button>
          <button
            type="button"
            onClick={this.handleGoHome}
            style={homeButtonStyle}
          >
            Главное меню
          </button>
        </form>

        {savedData ? (
          <div>
            <h3>Последние отправленные данные</h3>
            <p>
              {savedData.firstName} {savedData.lastName}, {savedData.age} лет
            </p>
          </div>
        ) : (
          <p>Данные отсутствуют</p>
        )}
      </div>
    );
  }
}

export default ClassComponent;


