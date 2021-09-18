import { useState } from 'react';
// import { toast } from 'react-toastify';
import { Text, VStack } from '@chakra-ui/layout';

// import { DatePicker, Select } from "antd";
import { useSelector } from 'react-redux';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { createHotel } from '../../redux/actions/hotel';
import HotelCreateForm from '../../components/forms/HotelCreateForm';

// const { Option } = Select;

const NewHotel = () => {
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  // state
  const [values, setValues] = useState({
    title: '',
    content: '',
    image: '',
    price: '',
    from: '',
    to: '',
    bed: '',
  });
  const [preview, setPreview] = useState(
    'https://via.placeholder.com/100x100.png?text=PREVIEW'
  );
  const [location, setLocation] = useState('');
  // destructuring variables from state
  const { title, content, image, price, from, to, bed } = values;

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(values);
    // console.log(location);

    const hotelData = new FormData();
    hotelData.append('title', title);
    hotelData.append('content', content);
    hotelData.append('location', location);
    hotelData.append('price', price);
    image && hotelData.append('image', image);
    hotelData.append('from', from);
    hotelData.append('to', to);
    hotelData.append('bed', bed);

    console.log([...hotelData]);

    try {
      const res = await createHotel(token, hotelData);
      console.log('HOTEL CREATE RES', res);
      // toast.success('New hotel is posted');
      console.log("REACT-TOASTIFY MESSAGE HERE")
      setTimeout(() => {
        typeof window !== 'undefined' && window.location.reload();
      }, 1000);
    } catch (err) {
      console.log(err);
      // toast.error(err.response.data);
      console.log("REACT-TOASTIFY MESSAGE HERE")
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setValues({ ...values, image: e.target.files[0] });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Add Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelCreateForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
              location={location}
              setLocation={setLocation}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <Text color={useColorModeValue('gray.900', 'gray.50')}>
              JSON: {JSON.stringify(values, null, 4)}
              Location in JSON: {JSON.stringify(location)}
            </Text>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewHotel;
