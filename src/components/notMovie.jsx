const NotMovie = () => {
  let btn = document.getElementById("btnHome");
  btn.addEventListener("click", refresh);
  function refresh() {
    window.location.reload();
  }
  return (
    <>
      <div className="vpn">
        <h1 className="text">
          Please search <span>Movie name</span> for visit website
        </h1>
      </div>
    </>
  );
};

export default NotMovie;
