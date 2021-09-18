import { useState, useEffect } from 'react';
// import { toast } from 'react-toastify';
// import { Select } from "antd";
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { read, updateHotel } from '../../../redux/actions/hotel';
import HotelEditForm from '../../../components/forms/HotelEditForm';
// ! useRouter from Nextjs
// const { Option } = Select;

const BASE_URL = process.env.REACT_APP_API || 'http://localhost:8000/api';

const EditHotel = () => {
  const router = useRouter();
  const {
    query: { hotelId },
  } = router;
  // redux
  const { auth } = useSelector((state) => ({ ...state }));
  const { token } = auth;
  // state
  const [values, setValues] = useState({
    title: '',
    content: '',
    location: '',
    price: '',
    from: '',
    to: '',
    bed: '',
  });
  const [image, setImage] = useState('');
  const [preview, setPreview] = useState(
    'https://via.placeholder.com/100x100.png?text=PREVIEW'
  );
  // destructuring variables from state
  const { title, content, price, from, to, bed, location } = values;

  // useEffect(() => {
  //   loadSellerHotel();
  // }, [loadSellerHotel]);
  useEffect(() => {
    loadSellerHotel();
  }, []);

  const loadSellerHotel = async () => {
    const res = await read(hotelId);
    // console.log(res);
    setValues({ ...values, ...res.data });
    setPreview(`${BASE_URL}/hotel/image/${res.data._id}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hotelData = new FormData();
    hotelData.append('title', title);
    hotelData.append('content', content);
    hotelData.append('location', location);
    hotelData.append('price', price);
    image && hotelData.append('image', image);
    hotelData.append('from', from);
    hotelData.append('to', to);
    hotelData.append('bed', bed);

    try {
      const res = await updateHotel(token, hotelData, hotelId);
      console.log('HOTEL UPDATE RES', res);
      // toast.success(`${res.data.title} is updated`);
      console.log("REACT-TOASTIFY MESSAGE HERE")
    } catch (err) {
      console.log(err);
      // toast.error(err.response.data.err);
      console.log("REACT-TOASTIFY MESSAGE HERE")
    }
  };

  const handleImageChange = (e) => {
    // console.log(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
    setImage(e.target.files[0]);
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center">
        <h2>Edit Hotel</h2>
      </div>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <br />
            <HotelEditForm
              values={values}
              setValues={setValues}
              handleChange={handleChange}
              handleImageChange={handleImageChange}
              handleSubmit={handleSubmit}
            />
          </div>
          <div className="col-md-2">
            <img
              src={preview}
              alt="preview_image"
              className="img img-fluid m-2"
            />
            <pre>{JSON.stringify(values, null, 4)}</pre>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditHotel;
