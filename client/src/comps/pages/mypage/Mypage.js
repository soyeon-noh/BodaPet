import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { faFileVideo } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import moment from "moment";
import "../../../static/css/ReactCalendar.css";
import useUserStore from "../../../zustand/UserStore";
import useReportStore from "../../../zustand/ReportStore";

const Mypage = () => {
  const navigate = useNavigate();
  const movePetList = () => {
    console.log("Mypage movePetList");
    navigate("/petList");
  };

  const [pet, setPet] = useState({});
  const [petList, setPetList] = useState([]);
  const [dateList, setDateList] = useState([]);

  const { loginUser } = useUserStore();

  // pet 정보 가져오기
  const getPetList = async () => {
    const res = await fetch(
      `http://localhost:5050/mypage/pet/${loginUser.userId}`
    );
    const resJson = await res.json();
    setPetList(resJson.pets);
    console.log("resJson: ", resJson.pets);
    console.log("petList: ", petList);
  };
  useEffect(() => {
    getPetList();
  }, [setPetList]);

  const PetInsertBox = () => {
    return (
      <button
        onClick={() => movePetList()}
        class="bg-white hover:bg-gray-100 text-sky-600 font-semibold py-2 px-4 border border-blue-300 rounded shadow"
      >
        반려동물 추가하기
      </button>
    );
  };

  const petListBox = petList.map((pet) => {
    return (
      <div class="rounded-full h-20 w-20 flex text-sky-700 items-center justify-center bg-white mx-2 border border-solid border-blue-200 shadow-sm hover:bg-sky-100 cursor-pointer">
        {pet.name}
      </div>
    );
  });

  const [value, onChange] = useState(new Date());

  // const [mark, setMark] = useState(["2022-06-10"]);

  const getReportDate = async (date) => {
    const res = await fetch(
      `http://localhost:5050/mypage/user/${loginUser.userId}/`
    );
    const resJson = await res.json();
    setDateList(resJson.dateList);
    console.log("resJson: ", resJson.dateList);
    console.log("petList: ", dateList);
    // 결과를  ["2022-02-02", "2022-02-02", "2022-02-10"] 형태로 변환해야함};
  };
  useEffect(() => {
    getReportDate();
  }, [setDateList]);

  const { report, setReport } = useReportStore();

  const moveReport = async (e) => {
    console.log(moment(e).format("YYYY-MM-DD"));
    const date = moment(e).format("YYYY-MM-DD");
    const res = await fetch(
      `http://localhost:5050/report/date/${date}/user/${loginUser.userId}/`
    );
    const resJson = await res.json();
    await setReport(resJson);
    console.log("resJson: ", resJson);
    console.log(report);

    navigate(`/report`);
  };

  return (
    <section>
      <div class="bg-main py-6 ">
        <div class="max-w-sm mx-auto">
          {petList.length > 0 ? (
            <ul class="flex">{petListBox}</ul>
          ) : (
            <div class="text-center">
              <PetInsertBox />
            </div>
          )}
        </div>
      </div>
      <div class="max-w-xs mx-auto py-6">
        <div class="max-w-xs mx-auto py-2">
          <Calendar
            onChange={onChange}
            onClickDay={(e) => moveReport(e)}
            formatDay={(local, date) => moment(date).format("DD")}
            value={value}
            className="w-full mx-auto text-sm border-blue-100 border-solid rounded-md shadow-lg"
            tileContent={({ date, view }) => {
              if (
                dateList.find((x) => x === moment(date).format("YYYY-MM-DD"))
              ) {
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
          {petList.length > 0 ? (
            <button
              onClick={() => movePetList()}
              class="block ml-auto my-8 bg-white hover:bg-gray-100 text-gray-700 font-semibold py-2 px-4 border border-gray-300 rounded shadow"
            >
              반려동물 다시 등록하기
            </button>
          ) : (
            <></>
          )}
        </div>
      </div>
    </section>
  );
};

export default Mypage;
