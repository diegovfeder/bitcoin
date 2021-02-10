import React from 'react';
import {Text} from 'react-native';
import {Container} from './styles';

// TODO: Find out how to type chaining like this. An object key is used as determines the following object type.
// interface IContainer {}
const obj = {coin: 'doge'};
const container = {};
container[obj.coin] = 'to the moon';
console.log(container);

const DogeCoin: React.FC = () => {
  return (
    <Container>
      <Text>DogeCoin</Text>
    </Container>
  );
};

export default DogeCoin;
