import useResource from "lib/utils/useResource";

const SecondPage = () => {

  useResource('script', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js');
  useResource('css', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.0/css/bootstrap.min.css');

  return (
      <h1>두번째 페이지</h1>
  );
}

export default SecondPage;