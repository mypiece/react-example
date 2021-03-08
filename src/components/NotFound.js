const NotFound = ({pathname}) => {
  return (
      <div>
        <p>{pathname}</p>
        <h2>존재하지 않는 페이지입니다.</h2>
      </div>
  );
}

export default NotFound;