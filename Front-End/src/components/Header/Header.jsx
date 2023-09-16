import React, { useState } from "react";
import "./Header.css";
import { BiMenuAltRight } from "react-icons/bi";
import { getMenuStyles } from "../../utils/common";
import useHeaderColor from "../../hooks/useHeaderColor";
import OutsideClickHandler from "react-outside-click-handler";
import { Link, NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import AddPropertyModal from "../AddProperty/AddPropertyModal";
import useAuthCheck from "../../hooks/useAuthCheck";

const Header = () => {
  const{loginWithRedirect,isAuthenticated,user,logout}=useAuth0()
  const [menuOpened, setMenuOpened] = useState(false);
  const [modolOpened,setModolOpened]=useState(false)
  const headerColor = useHeaderColor();
  const{validateLogin}=useAuthCheck()
  const handleAddProperty=()=>{
    if(validateLogin()){
      setModolOpened(true)
    }

  }

  return (
    <section className="h-wrapper" style={{ background: headerColor }}>
      <div className="flexCenter innerWidth paddings h-container">
        {/* logo */}
        <Link to='/'>
        <img src="./logo.png" alt="logo" width={100} />
        </Link>
      

        {/* menu */}
        <OutsideClickHandler
          onOutsideClick={() => {
            setMenuOpened(false);
          }}
        >
          <div
            // ref={menuRef}
            className="flexCenter h-menu"
            style={getMenuStyles(menuOpened)}
          >
            <NavLink to="/properties">Properties</NavLink>
            <a href="mailto:zainkeepscode@gmail.com">Contact</a>
            <div onClick={handleAddProperty} >Add Property</div>
            <AddPropertyModal opened={modolOpened} setOpened={setModolOpened} />
            {
              !isAuthenticated ?(
                <button className="button" onClick={loginWithRedirect}>
              Login
            </button>

              ):(
                <ProfileMenu  user={user} logout={logout}/>
              )
            }
            
          </div>
        </OutsideClickHandler>

        {/* for medium and small screens */}
        <div
          className="menu-icon"
          onClick={() => setMenuOpened((prev) => !prev)}
        >
          <BiMenuAltRight size={30} />
        </div>
      </div>
    </section>
  );
};

export default Header;
