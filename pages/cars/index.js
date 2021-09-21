import { VStack, Heading } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { allHotels } from '../../redux/actions/hotel';
import SmallCard from '../../components/cards/SmallCard';
import Search from '../../components/forms/Search';
import SearchOriginal from '../../components/forms/SearchOriginal';
import { cars } from '../../cars';

export default function Home({ stevenscreek_cjd }) {
  console.log(stevenscreek_cjd);
  return (
    <VStack>
      <h1>The Cars Page</h1>
      {stevenscreek_cjd.map((car) => (
        <div key={car.id}>
          <h1>{car.carName}</h1>
          <p>{car.id}</p>
        </div>
      ))}
    </VStack>
  );
}

export async function getStaticProps() {
  const url =
    'https://api.sheety.co/ef799b718e60af0fe39abfda6cd4f2ec/cjdApi/stevenscreekCjd';
  const response = await fetch(url);
  const data = await response.json();

  return {
    props: {
      stevenscreek_cjd: data.stevenscreekCjd,
    },
  };
}
