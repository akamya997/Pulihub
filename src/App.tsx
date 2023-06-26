import React from 'react';
import { useState } from 'react';
import axios from "axios";
import "../static/core.css";

async function getData() {
  const res = await axios.get('http://localhost:8081/api/data');
  return res.data;
}

function App() {
  const [videos, setVideos] = useState<JSX.Element[]>();
  React.useEffect(() => {
    getData().then((res) => {
      const vids:string[] = [];
      for(const key in res) {
        vids.push(key);
      }
      const listItems = vids.map((key:string) => {
        const url = "?vcode=" + key;
        return (
          <div className="col mb-4" key={key}>
            <div className="card h-100">
              <a href={url}>
                <img src={res[key]["poster"]} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">
                    {res[key]["title"]}
                  </h5>
                  <p className="card-text">
                    {res[key]["desc"]}
                  </p>
                </div>
              </a>
            </div>
          </div>
        );
      })
      console.log(listItems);
      setVideos(listItems);
    });
  }, []);

  return (
    <div id="vlist" className="row row-cols-1 row-cols-md-3">
      {videos}
    </div>
  )
}

export default App;
