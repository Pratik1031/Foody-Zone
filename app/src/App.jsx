import styled from 'styled-components';
import { useEffect, useState } from 'react';
import CardContainer from './components/CardContainer';
export const BASE_URL = 'http://localhost:9000';
const App = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filteredData, setFilteredData] = useState(null);
  const [error, setError] = useState();
  const [selectedBtn, setSelectedBtn] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(BASE_URL);
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
        setFilteredData(jsonData);
        setError(false);
      } catch (error) {
        setError('Unable to Fetch Data From Server');
      }
    };
    fetchData();
  }, []);

  const filterFood = (type) => {
    if (type === 'all') {
      setFilteredData(data);
      setSelectedBtn('all');
      return;
    }

    const filter = data?.filter((food) =>
      food.type.toLowerCase().includes(type.toLowerCase())
    );
    setFilteredData(filter);
    setSelectedBtn(type);
  };

  const filterBtns = [
    {
      name: 'All',
      type: 'all',
    },
    {
      name: 'Breakfast',
      type: 'breakfast',
    },
    {
      name: 'Lunch',
      type: 'lunch',
    },
    {
      name: 'Dinner',
      type: 'dinner',
    },
  ];

  const searchFood = (e) => {
    const searchValue = e.target.value;
    // console.log(searchValue);
    if (searchValue === '') {
      setFilteredData(null);
    }
    const filter = data?.filter((food) =>
      food.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    setFilteredData(filter);
  };

  if (error) return <div>{error}</div>;
  if (loading) return <div>loading.....</div>;

  return (
    <>
      {' '}
      <Container>
        <TopContainer>
          <div className='logo'>
            <img src='./images/logo.svg' alt='logo' />
          </div>
          <div className='search'>
            <input onChange={searchFood} placeholder='Search Food' />
          </div>
        </TopContainer>
        <FilteredContainer>
          {filterBtns.map((value) => (
            <Button
              isSelected={selectedBtn === value.type}
              key={value.name}
              onClick={() => filterFood(value.type)}
            >
              {value.name}
            </Button>
          ))}
        </FilteredContainer>
      </Container>
      <CardContainer data={filteredData} />
    </>
  );
};

export default App;

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
const FilteredContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.5rem;
  padding-bottom: 40px;
`;

export const Button = styled.button`
  background: ${({ isSelected }) => (isSelected ? '#f22f2f' : '#ff4343')};
  outline: 1px solid ${({ isSelected }) => (isSelected ? 'white' : '#ff4343')};
  border-radius: 5px;
  padding: 6px 12px;
  border: none;
  color: white;
  cursor: pointer;
  &:hover {
    background-color: #f22f2f;
  }
`;

const TopContainer = styled.div`
  height: 140px;
  display: flex;
  justify-content: space-between;
  padding: 16px;
  align-items: center;

  .search {
    input {
      border-radius: 5px;
      border: 1px solid #ff0909;
      padding: 8px 15px;
      background: transparent;
      color: white;
      font-size: 1rem;
    }
  }

  @media (0 < width < 600px) {
    flex-direction: column;
    height: 120px;
  }
`;
