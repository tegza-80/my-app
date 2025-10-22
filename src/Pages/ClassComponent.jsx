
import React, { Component } from 'react';

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

  //Отрисовка
  render() {
    const { firstName, lastName, age, savedData } = this.state;
    const valid = this.isValid();

    return (
      <div style={{ padding: 20 }}>
        <form onSubmit={this.handleSave} style={{ marginBottom: 20 }}>
          <label>
            Имя:
            <input
              type="text"
              name="firstName"
              value={firstName}
              onChange={this.handleChange}
              required
              autoFocus
            />
          </label>
          <br />
          <label>
            Фамилия:
            <input
              type="text"
              name="lastName"
              value={lastName}
              onChange={this.handleChange}
              required
            />
          </label>
          <br />
          <label>
            Лет:
            <input
              type="text"
              name="age"
              value={age}
              onChange={this.handleChange}
              required
            />
          </label>
          <br />
          <button type="submit" disabled={!valid} style={{ marginTop: 10 }}>
            Отправить
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
