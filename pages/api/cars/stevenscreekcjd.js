export default async function handler(req, res) {
  const url =
    'https://api.sheety.co/ef799b718e60af0fe39abfda6cd4f2ec/cjdApi/stevenscreekCjd';
  const response = await fetch(url);
  const data = await response.json();
  res.status(200).json(data);
}
