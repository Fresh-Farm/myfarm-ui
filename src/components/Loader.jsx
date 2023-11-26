import loader from '../assets/logo-icon-only.svg';

const Loader = () => {    
    return (
        
            <div className="loader">
            <img src={loader} alt="logo-icon-only"/>
            <div className="loader-inner"></div>
        </div>
    )
}

export default Loader;