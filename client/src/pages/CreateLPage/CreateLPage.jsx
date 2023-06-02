import React, { useContext, useState, useCallback, useEffect } from 'react';
import axios from 'axios';

import './CreateLPage.css'
import { AuthContext } from '../../context/AuthContext';

export default function CreateLPage() {
  const { userId } = useContext(AuthContext);

  const [ link, setLink ] = useState('');

  const [ links, setLinks ] = useState([{}]);

  const [errInf, errInfSet] = useState('');

  const resetError = () => {
    errInfSet('');
}

  const getLinks = useCallback(async () => {
    try {
      await axios.get('http://localhost:5000/link', {
        headers: {
          "Content-Type": 'application/json'
        },
        params: {
          userId: userId
        }
      })
      .then(response => {
        setLinks(response.data.links)
      });
    } catch(err) {
      console.error(err);
    }
  }, [userId]);

  const convertLink = useCallback(async () => {
    if(!link) return errInfSet('nothing has been entered...');

    try {
      await axios.post('http://localhost:5000/link/convert', { link, userId }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then((response) => {
        setLinks([...links], response.data.link);
        setLink('');
        getLinks();
      });
    } catch(err) {
      errInfSet(err.response.data.msg);
      console.error(err);
    }
  }, [link, userId, links, getLinks]);

  useEffect(() =>{
    getLinks();
  }, [getLinks]);

  return (
      <div className="container-createL">
        <main>
          <div className="py-4">
            <h2>Create link</h2>
            <p className="lead" _msttexthash="295732970" _msthash="0">Use the interface below and become happier</p>
          </div>

          <div className="mb-3 form-floating err-inp" style={{display: errInf ? 'block' : 'none'}}>
              {errInf}
          </div>

          <div className="row g-5">
            <div className="col-md-7 col-lg-8">
              <form onSubmit={e => e.preventDefault()}>
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="inputLink" className="form-label">Paste the link</label>
                    <input 
                      type="text" 
                      className="form-control" 
                      id="inputLink" 
                      placeholder="http://"
                      value={link}
                      onChange={e => {setLink(e.target.value); resetError()}}  
                    />
                  </div>
                </div>

                <button 
                  className="my-4 w-80 btn btn-primary btn-lg" 
                  type="submit"
                  onClick={convertLink}  
                >Create</button>
              </form>
            </div>
          
            <hr className="my-4"/>

            <div className="col-md-7 col-lg-8">
                <div className="row g-3">
                  <div className="col-12">
                    <label htmlFor="inputLink" className="form-label">Converted links</label>
                      {
                        links.map((l, index) => {
                          return(
                            <div className='convertedLink-box' key={index}>
                              <div className='mb-3 box-item'>
                                <span className='link-box-item'>{l.link}</span>
                                <div className='convert-box-item'>http://localhost:3000/{l.converLink}</div>
                              </div>
                            </div>
                          )
                        })
                      }
                  </div>
                </div>
            </div>
          </div>
        </main>
      </div>
  )
}
