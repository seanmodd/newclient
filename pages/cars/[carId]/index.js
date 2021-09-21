import { VStack } from '@chakra-ui/layout';

function App({ stevenscreek_cjd }) {
  return (
    <VStack>
      <h1>The carId page!</h1>
      <p>{stevenscreek_cjd.id}</p>
      <p>{stevenscreek_cjd.carName}</p>
    </VStack>
  );
}

export default App;

export async function getStaticPaths() {
  const url =
    'https://api.sheety.co/ef799b718e60af0fe39abfda6cd4f2ec/cjdApi/stevenscreekCjd';
  const response = await fetch(url);
  const data = await response.json();

  const mydata = data.stevenscreekCjd;
  const paths = mydata.map((car) => ({
    params: {
      carId: `${car.id}`,
    },
  }));
  return {
    // paths: [
    //   { params: { carId: '1' } },
    //   { params: { carId: '2' } },
    //   { params: { carId: '3' } },
    // ],
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  //! HERE YOU MUST CREATE THE API TO THE NETLIFY SERVER AND CREATE AN API ENDPOINT FROM NEXTJS ITSELF TO THEN FETCH THE DATA DYNAMICALLY!
  //! ...I think
  const { params } = context;
  const url = `https://api.sheety.co/ef799b718e60af0fe39abfda6cd4f2ec/cjdApi/stevenscreekCjd/${params.carId}`;
  const response = await fetch(url);
  const data = await response.json();

  return {
    props: {
      stevenscreek_cjd: data.stevenscreekCjd,
    },
  };
}
