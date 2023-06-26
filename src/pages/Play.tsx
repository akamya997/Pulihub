import React from "react";
import { useState } from 'react';
import axios from "axios";
import { useParams } from 'react-router-dom';

async function getData() {
  const res = await axios.get('http://localhost:8081/api/data');
  return res.data;
}

async function getLink(data:any) {
  if(data == undefined) return "";
  if(data["type"] == "bhpan") {
    const res = await axios.post("https://bhpan.buaa.edu.cn/api/v1/link?method=osdownload", data["postdata"]);
    console.log(res);
    return res;
  }
  else {
    return data["link"];
  }
}

const Play: React.FC = () => {
  const { vcode } = useParams();
  const [data, setData] = useState();
  const [link, setLink] = useState("");
  React.useEffect(() => {
    getData().then((res) => {
      const data = res[vcode!];
      console.log(data);
      setData(data);
      getLink(data).then((res) => {
        setLink(res);
      })
    })
  }, []);
  return (
    <>
      <video playsInline controls>
        <source src={link} type="video/mp4" />
      </video>
      <div id="vinfo" className="m-2 mt-3">
        <h4 id="vtitle" className="pt-2 pb-2">
          {data?data["title"]:""}
        </h4>
        <p id="vdesc">
          {data?data["desc"]:""}
        </p>
      </div>
    </>
  )
}

export default Play;
