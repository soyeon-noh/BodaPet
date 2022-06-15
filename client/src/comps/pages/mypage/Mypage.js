import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faFileVideo } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "../../../static/css/ReactCalendar.css";

const Mypage = () => {
  const navigate = useNavigate();
  const movePetInsert = () => {
    navigate("/pet");
  };

  const [pet, setPet] = useState({});
  const [petList, setPetList] = useState([]);

  // pet 정보 가져오기
  const getPetList = async () => {
    const res = await fetch(`http://localhost:5050/mypage/pet`);
    const resJson = await res.json();
    setPetList(resJson.pets);
    console.log("resJson: ", resJson.pets);
    console.log("petList: ", petList);
  };
  useEffect(() => {
    getPetList();
  }, [setPetList]);

  const petListBox = petList.map((pet) => {
    return (
      <div class="rounded-full h-16 w-16 flex items-center justify-center bg-white mx-2 border border-solid border-blue-300 hover:bg-sky-200 cursor-pointer">
        {pet.name}
      </div>
    );
  });

  const [value, onChange] = useState(new Date());

  const [mark, setMark] = useState(["2022-06-10"]);

  // const fetch = async () => {
  //   const result = await fetch();
  //   return result.data;
  //   // 결과를  ["2022-02-02", "2022-02-02", "2022-02-10"] 형태로 변환해야함
  // };

  const vggFetch = async () => {
    console.log("vgg Fetch 진입");
    const vggRes = await fetch(`http://localhost:5050/mypage/vgg`);

    if (vggRes.status == 200) {
      alert("vgg성공");
    }
  };

  return (
    <section>
      <div class="bg-main py-6 ">
        <div class="max-w-sm mx-auto">
          <ul class="flex">
            {petListBox}
            <li
              onClick={movePetInsert}
              class="rounded-full h-16 w-16 flex items-center justify-center bg-gray-100 cursor-pointer  text-gray-400 mx-2 border border-solid border-gray-400 hover:bg-gray-300"
            >
              +
            </li>
          </ul>
        </div>
      </div>
      <button onClick={vggFetch}>테스트버튼 vgg </button>
      <div class="max-w-xs mx-auto py-6">
        <div class="max-w-xs mx-auto py-2">
          <Calendar
            onChange={onChange}
            onClickDay={(e) => {
              console.log(moment(e).format("YYYY-MM-DD"));
            }}
            formatDay={(local, date) => moment(date).format("DD")}
            value={value}
            className="w-full mx-auto text-sm border-blue-100 border-solid rounded-md shadow-lg"
            tileContent={({ date, view }) => {
              if (mark.find((x) => x === moment(date).format("YYYY-MM-DD"))) {
                return (
                  <>
                    <div className="flex items-center justify-center absoluteDiv">
                      <div className="flex w-2 h-2 ml-px rounded-full bg-sky-300" />
                    </div>
                  </>
                );
              } else {
                return (
                  <>
                    <div className="flex items-center justify-center absoluteDiv">
                      <div className="flex w-2 h-2 ml-px rounded-full " />
                    </div>
                  </>
                );
              }
            }}
          />
        </div>
      </div>
    </section>
  );
};

export default Mypage;
