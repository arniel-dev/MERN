
import PropTypes from 'prop-types';

const SignUp =({toggle})=> {
    
    return (
        <div className="col align-items-center flex-col sign-up">
        <div className="form-wrapper align-items-center">
          <div className="form sign-up">
            <div className="input-group">
              <i className="bx bxs-user"></i>
              <input type="text" placeholder="Firstname" />
            </div>
            <div className="input-group">
              <i className="bx bxs-user"></i>
              <input type="text" placeholder="Lastname" />
            </div>
            <div className="input-group">
              <i className="bx bx-mail-send"></i>
              <input type="email" placeholder="Email" />
            </div>
            <div className="input-group">
              <i className="bx bxs-lock-alt"></i>
              <input type="password" placeholder="Password" />
            </div>
            <div className="input-group">
              <i className="bx bxs-lock-alt"></i>
              <input type="password" placeholder="Confirm password" />
            </div>
            <button>Sign up</button>
            <p>
              <span>Already have an account?</span>
              <b onClick={toggle} className="pointer">
                Sign in here
              </b>
            </p>
          </div>
        </div>
      </div>
    )
    
  }
  
  SignUp.propTypes ={
    toggle:PropTypes.func
  }
  
  export default SignUp
  