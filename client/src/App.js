import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from "react-hook-form";


function App() {
  const { register, handleSubmit } = useForm();
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      {loggedIn ? (<div>
        <form onSubmit={handleSubmit()}>
          <label for="username">
            <input
            name="username"
            ref={register({ required: true })}
            type="text"
            />
          </label>
           <label for="password">
             <input
            name="password"
            ref={register({ required: true })}
            type="text"
            />
           </label>
           <input type="submit"/>
        </form>
      </div>) : (<div></div> ) }
    </div>
  );
}

export default App;
