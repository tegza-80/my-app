
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function FunctionalComponent() {
  const navigate = useNavigate();

  // Состояния для сортировки
  const [minAge, setMinAge] = useState('');//строки для ввода минимального возраста 
  const [maxAge, setMaxAge] = useState('');//строки для ввода максимального возраста 
  const [sortOrder, setSortOrder] = useState('none');//сортировка (без сортировки)
  const [filtersEnabled, setFiltersEnabled] = useState(false);//флаг включающий/отключающий фильтры и сортировку.
  const [users, setUsers] = useState([]);//массив пользователей
  const [loading, setLoading] = useState(false);//индикатор загрузки данных
  const [error, setError] = useState(null);//ошибка при загрузке данных

  // Валидация только цифры
  const handleMinAgeChange = e => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setMinAge(value);
  };
  const handleMaxAgeChange = e => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) setMaxAge(value);
  };

  // Функция запроса данных с fetch
  const fetchWithFetch = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        'https://randomuser.me/api/?results=10&inc=gender,name,picture,dob'
      );
      if (!response.ok) throw new Error('Ошибка при загрузке данных');
      const data = await response.json();
      return data.results;
    } catch (e) {
      setError(e.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Функция запроса данных с axios
  const fetchWithAxios = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        'https://randomuser.me/api/',
        { params: { results: 10, inc: 'gender,name,picture,dob' } }
      );
      return response.data.results;
    } catch (e) {
      setError(e.message);
      return [];
    } finally {
      setLoading(false);
    }
  };

  // Обработка и фильтрация данных по фильтрам
  const processUsers = rawUsers => {
    let filtered = rawUsers;

    if (filtersEnabled) {
      // Фильтрация по возрасту
      filtered = filtered.filter(user => {
        const age = user.dob.age;
        if (minAge !== '' && age < +minAge) return false;
        if (maxAge !== '' && age > +maxAge) return false;
        return true;
      });

      // Сортировка по возрасту
      if (sortOrder === 'asc') {//по возрастанию возраста
        filtered.sort((a, b) => a.dob.age - b.dob.age);
      } else if (sortOrder === 'desc') {//по убыванию
        filtered.sort((a, b) => b.dob.age - a.dob.age);
      }
    }

    return filtered;
  };

  // Обработка Запросить
  const handleFetchClick = async () => {
    const rawUsers = await fetchWithAxios();
    const filteredUsers = processUsers(rawUsers);
    setUsers(filteredUsers);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>{}
      <div style={{ marginBottom: 20, borderBottom: '1px solid #ccc', paddingBottom: 10 }}>
        <button onClick={() => navigate('/')} style={{ marginRight: 20 }}>
          Главная страница
        </button>

        <label style={{ marginRight: 10 }}>
          Мин. возраст:{' '}
          <input
            style={{ width: 60 }}
            value={minAge}
            onChange={handleMinAgeChange}
            placeholder="0"
          />
        </label>
        <label style={{ marginRight: 20 }}>
          Макс. возраст:{' '}
          <input
            style={{ width: 60 }}
            value={maxAge}
            onChange={handleMaxAgeChange}
            placeholder="100"
          />
        </label>

        <label style={{ marginRight: 20 }}>
          Сортировка:{' '}
          <select value={sortOrder} onChange={e => setSortOrder(e.target.value)}>
            <option value="none">Без сортировки</option>
            <option value="asc">По возрастанию</option>
            <option value="desc">По убыванию</option>
          </select>
        </label>

        <label style={{ marginRight: 20, display: 'inline-flex', alignItems: 'center', gap: 5 }}>
          Фильтры включены
          <input
            type="checkbox"
            checked={filtersEnabled}
            onChange={e => setFiltersEnabled(e.target.checked)}
          />
        </label>

        <button onClick={handleFetchClick} style={{ padding: '6px 12px' }}>
          Запросить
        </button>
      </div>

      {error && <div style={{ color: 'red' }}>Ошибка: {error}</div>}
      {loading && <div>Загрузка...</div>}
      {!loading && users.length === 0 && <div>Нет данных</div>}

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20 }}>
        {users.map((user, index) => (
          <div
            key={index}
            style={{
              border: '1px solid #ddd',
              borderRadius: 8,
              padding: 10,
              width: 180,
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              textAlign: 'center',
            }}>
            <img
              src={user.picture.medium}
              alt={`${user.name.first} ${user.name.last}`}
              style={{ borderRadius: '50%', marginBottom: 10 }}
            />
            <div>
              <b>
                {user.name.first} {user.name.last}
              </b>
            </div>
            <div>Возраст: {user.dob.age}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FunctionalComponent;
