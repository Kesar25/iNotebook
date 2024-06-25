import React  from 'react'
import { Link, useLocation, useNavigate} from "react-router-dom"

function Navbar(props) {
  const location = useLocation();
  let navigate=useNavigate();
  const handleLogOut=()=>{
    localStorage.removeItem('token')
    navigate("/login")
    props.showAlert("User logged out successfully", "success")
  }
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">iNotebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/"?"active":""}`} to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname==="/About"?"active":""}`} to="/About">About</Link>
              </li>
          </ul>
          {!localStorage.getItem('token')?<form className='d-flex'>
          <Link className="btn btn-primary mx-1" to="/login" role="button" aria-disabled="true">Login</Link>
          <Link className="btn btn-primary mx-1" to="/signup" role="button" aria-disabled="true">SignUp</Link>
          </form>:<button className="btn btn-primary mx-1" onClick={handleLogOut}>Logout</button>}
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar
