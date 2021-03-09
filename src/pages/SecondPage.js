import ImportResource from "lib/utils/ImportResource";

const SecondPage = () => {

  ImportResource('script', 'https://cdnjs.cloudflare.com/ajax/libs/jquery/2.0.0/jquery.min.js');
  ImportResource('css', 'https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.0.0/css/bootstrap.min.css');

  return (
      <h1>두번째 페이지</h1>
  );
}

export default SecondPage;