import React from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import Plyr from "plyr-react";
import "plyr-react/plyr.css";
import { getData } from "../service";

async function getLink(data: any) {
  if (data == undefined) return "";
  if (data["type"] == "bhpan") {
    const res = await axios.post(
      "https://bhpan.buaa.edu.cn/api/v1/link?method=osdownload",
      data["postdata"],
      { headers: { "Content-Type": "text/plain" } }
    );
    console.log(res.data["authrequest"][1]);
    return res.data["authrequest"][1];
  } else {
    return data["link"];
  }
}

const Play: React.FC = () => {
  const { vcode, pid } = useParams();
  const vPid = Number(pid) - 1;
  const [data, setData] = useState();
  const [link, setLink] = useState("");
  React.useEffect(() => {
    getData().then((res) => {
      if (vcode !== undefined) {
        const data = res[vcode];
        console.log(data);
        setData(data);
        getLink(data["videos"][vPid]).then((res) => {
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
          poster: data ? data["poster"] : "",
        },
      ],
    },
  };
  return (
    <>
      <Plyr {...plyrProps} />
      <div id="vinfo" className="m-2 mt-3">
        <div className="float-end">
          <ul className="pagination">
            {vPid ? (
              <li className="page-item">
                <a
                  className="page-link"
                  href={"/pulipuli/play/" + vcode + "/" + vPid.toString()}
                >
                  上一集
                </a>
              </li>
            ) : (
              <li className="page-item disabled">
                <a className="page-link">上一集</a>
              </li>
            )}
            {data !== undefined && vPid == data["videos"].length - 1 ? (
              <li className="page-item disabled">
                <a className="page-link">下一集</a>
              </li>
            ) : (
              <li className="page-item">
                <a
                  className="page-link"
                  href={"/pulipuli/play/" + vcode + "/" + (vPid + 2).toString()}
                >
                  下一集
                </a>
              </li>
            )}
          </ul>
        </div>
        <h4 id="vtitle" className="pt-2 pb-2">
          {data ? data["title"] : ""}
        </h4>
        <p id="vdesc">{data ? data["desc"] : ""}</p>
      </div>
    </>
  );
};

export default Play;
