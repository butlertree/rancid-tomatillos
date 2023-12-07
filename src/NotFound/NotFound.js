import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';


function NotFound() {
    return (
      <div className="not-found">
        <h2>404 Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <NavLink to="/" className="nav">Main</NavLink>
      </div>
    );
  }
  
  export default NotFound;