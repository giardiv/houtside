
import {
    useParams
} from "react-router-dom";
import logo from './scene.png';

import { useState } from 'react';
import axios from 'axios';



const domain = "tocato.co";


export default function Wall() {
    // We can use the `useParams` hook here to access
    // the dynamic pieces of the URL.
    let { node } = useParams();
    const [link, setLink] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
      console.log(node)
        const params = {
            node: node,
            password: password
          };
          let axiosInstance = axios.create({
            baseURL: 'https://glacial-garden-78561.herokuapp.com/https://tocato.herokuapp.com/'
          });
      
          axiosInstance.post(`/webhook/check`, params)
            .then(res => {
                if(res){
                  console.log(res)
                  console.log(res.data[0].result)
                    setLink(res.data[0].result)
                }
            })
        e.preventDefault();
    };
    return (
      <div className="container h-100">
      <div className="row align-items-center h-100">
          {!link ?
          <form className="form-check text-center">
              <img className="mb-4" src={logo} alt="houtsi.de logo" width="72"/>
              <div className="form-floating">
                <input type="password" className="form-control" id="floatingPassword" name="password" placeholder="Password" 
               onChange={e =>setPassword(e.target.value)} required/>
              <label htmlFor="floatingPassword">Enter password</label>
              </div>
              <button onClick={handleSubmit} className="w-100 btn btn-lg btn-primary mt-3" type="submit">Access to private link</button>
              <p className="mt-5 mb-3 text-muted">© 2017–2021 - <a href="https://tally.so/r/mKzoKn" target="_blank" rel="noreferrer" >Send a feedback</a></p>
          </form> :
          <div className="row align-items-center">
              <div className="col-4 mx-auto">
                  <div className="text-center"><img className="mb-4" src={logo} alt="houtsi.de logo" width="72"/>
                  </div>
                  <b className="mb-2 text-center">Private url</b>
                  <div className="bg-light border rounded-3 p-3 mt-2">
                      <a href={link}>{link}</a>
                  </div>
              </div>
          </div>
          }
      </div>
    </div>
    );
}