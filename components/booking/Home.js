import { useState, useEffect } from 'react';
import { allHotels } from '../../redux/actions/hotel';
import SmallCard from '../cards/SmallCard';
import Search from '../forms/Search';

const Home = (props) => {
  const [hotels, setHotels] = useState([]);

  console.log('Home Props', props);

  useEffect(() => {
    loadAllhotels();
  }, []);

  const loadAllhotels = async () => {
    const res = await allHotels();
    setHotels(res.data);
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h1>All Cars</h1>
      </div>
      <div className="col">
        <br />
        <Search />
      </div>
      <div className="container-fluid">
        <br />
        {/* <pre>{JSON.stringify(hotels, null, 4)}</pre> */}
        {hotels.map((h) => (
          <SmallCard key={h._id} h={h} />
        ))}
      </div>
    </>
  );
};

// export async function getServerSideProps(ctx) {
//   const res = await allHotels();
//   const data = await res.json();
//   console.log('SererSide Props', data);

//   return {
//     props: {
//       data: res,
//     },
//   };
// }

export default Home;
