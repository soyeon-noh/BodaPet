import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "react-calendar/dist/Calendar.css";
import useUserStore from "../../../zustand/UserStore";
import usePetStore from "../../../zustand/PetStore";
import Loading from "../Loading";

const PetInsert1 = () => {
  const navigate = useNavigate();

  const goPrevious = () => {
    navigate("/mypage");
  };
  const movePetInsert = () => {
    navigate("/petInsert");
  };
  const [loading, setLoading] = useState(false);

  const [pet, setPet] = useState({});
  // const [petList, setPetList] = useState([]);

  const { loginUser } = useUserStore();
  const { petList, setPetList } = usePetStore();

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

  const petListBox = petList.map((pet) => {
    return (
      <div
        key={pet.id}
        id={pet.id}
        onClick={(e) => {
          if (window.confirm("삭제하시겠습니까?")) {
            petDelete(e);
          }
        }}
        class="my-2 bg-sky-100 text-gray-600 rounded-lg h-16 w-full flex items-center justify-center  mx-2 border border-solid border-sky-300 hover:bg-sky-200 cursor-pointer"
      >
        {pet.name}
      </div>
    );
  });
  const petDelete = async (e) => {
    const petId = e.target.id;
    console.log("petDelete petId", petId);

    const res = await fetch(`http://localhost:5050/mypage/petDelete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ petId: petId }),
    });
    const resJson = await res.json();
    if (res.status === 404) {
      alert("삭제에 실패했습니다.");
      return;
    }
  };

  const vggFetch = async () => {
    setLoading(true);
    console.log("vgg Fetch 진입");
    const vggRes = await fetch(`http://localhost:5050/mypage/vgg`);

    if (vggRes.status == 200) {
      setLoading(false);
      navigate("/mypage")
    }
  };

  return (
    <section>
      {loading ? <Loading /> : null}
      <div class="bg-main py-6 ">
        <div class="max-w-sm mx-auto">
          <div class="text-left pt-14">
            <h3 class="inline-block mx-3 text-2xl font-extrabold text-md">
              반려동물 등록
            </h3>
          </div>
        </div>
      </div>
      <div class="py-6 ">
        <div class="max-w-xs mx-auto">
          {petListBox}
          <div
            onClick={() => movePetInsert()}
            class="text-gray-600 rounded-lg h-16 w-full flex items-center justify-center bg-gray-100 mx-2 border border-dashed border-gray-400 hover:bg-gray-200 cursor-pointer"
          >
            추가하기
          </div>
        </div>
      </div>
      <div class="flex justify-between max-w-xs mx-auto my-6">
        <button
          onClick={() => goPrevious()}
          class="block w-24 bg-grey-100 hover:bg-grey-500 font-bold py-2 px-4 border rounded"
        >
          이전
        </button>

        {petList.length > 0 ? (
          <button
            class="block ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={vggFetch}
          >
            등록 완료
          </button>
        ) : (
          <button
            class="block ml-auto bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => {
              alert("반려동물을 한 마리 이상 등록해주세요.");
            }}
          >
            등록 완료
          </button>
        )}
      </div>
    </section>
  );
};

export default PetInsert1;
