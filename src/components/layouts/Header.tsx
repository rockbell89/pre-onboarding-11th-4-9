import Logo from '../../assets/img/logo.svg';

const Header = () => {
  return (
    <header className="py-4 px-4">
      <div className="container mx-auto">
        <h1>
          <img src={Logo} alt="한국임상정보 로고" width={'120px'} />
        </h1>
      </div>
    </header>
  );
};

export default Header;
