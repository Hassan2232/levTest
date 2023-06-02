import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

export default function UnknownLPage() {
    const convert = (window.location.href).split('/').slice(-1)[0];
    const [link, setLink] = useState('');

    const getRedirect = useCallback(async () => {
        try {
          await axios.get('http://localhost:5000/link/redirect', {
            headers: {
              "Content-Type": 'application/json'
            },
            params: {
              convert: convert
            }
          })
          .then(response => {
            response.data.link ? setLink(response.data.link.link) : setLink('');
          });
        } catch(err) {
          console.error(err);
        }
      }, [convert]);

      useEffect(() =>{
        getRedirect();
      }, [getRedirect]);

    if(link) {
        window.location.href = link;
    } else {
        return (
            <div>Unknown</div>
        )
    }
}
