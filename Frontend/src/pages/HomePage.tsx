import { useContext, useState } from "react";
import { useAuth } from '../context/ContextAuth';
import '../../public/Styles/homePage.css'

function HomePage() {

  const { userDetails } = useAuth();
  console.log(userDetails);

  return (
      <div>
          <h1>Bonjour {userDetails?.profile.firstName}</h1>
      </div>
  );

}

export default HomePage;

