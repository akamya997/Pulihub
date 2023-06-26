import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";

async function getData() {
  const res = await axios.get("/api/data");
  return res.data;
}

async function getLink(data: any) {
  if (data == undefined) return "";
  if (data["type"] == "bhpan") {
    const res = await axios.post(
      "/api/link/bhpan",
      data["postdata"]
    );
    console.log(res.data["authrequest"][1]);
    return res.data["authrequest"][1];
  } else {
    return data["link"];
  }
}

const Play: React.FC = () => {
  const { vcode } = useParams();
  const [data, setData] = useState();
  const [link, setLink] = useState("");
  React.useEffect(() => {
    getData().then((res) => {
      if (vcode !== undefined) {
        const data = res[vcode];
        console.log(data);
        setData(data);
        getLink(data).then((res) => {
          setLink(res);
        });
      }
    });
  }, [vcode]);
  const plyrProps = {
    source: {
      type: "video" as Plyr.MediaType,
      title: data ? data["title"] : "",
      sources: [
        {
          src: link,
          type: "video/mp4",
        }
      ]
    }
  }
  return (
    <>
    <Plyr {...plyrProps} />
      <div id="vinfo" className="m-2 mt-3">
        <h4 id="vtitle" className="pt-2 pb-2">
          {data ? data["title"] : ""}
        </h4>
        <p id="vdesc">{data ? data["desc"] : ""}</p>
      </div>
    </>
  );
};

export default Play;
