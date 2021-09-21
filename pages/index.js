import { VStack, Heading } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { allHotels } from '../redux/actions/hotel';
import SmallCard from '../components/cards/SmallCard';
import Search from '../components/forms/Search';
import SearchOriginal from '../components/forms/SearchOriginal';
import { cars } from '../cars';

export default function Home({ stevenscreek_cjd }) {
  console.log(stevenscreek_cjd);
  return (
    <VStack>
      <h1>welcome to NextCar.</h1>
    </VStack>
  );
}
