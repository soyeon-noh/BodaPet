import pandas as pd
import numpy as np
import glob
import copy
from deep_sort.sort.tracker import custom_labels
import json


def df_file(save_txt_path):
    txt_path = save_txt_path

    # 저장된 텍스트 파일 가져오기
    file_list = glob.glob(txt_path)
    file_list_py = [file for file in file_list if file.endswith(".txt")]

    # 텍스트 파일을 데이터 프레임 형태로 불러오기
    file = pd.read_table(file_list_py[0], header=None,
                         names=['frame', 'track_id', 'bbox_left', 'bbox_top', 'w', 'h', 'cx', 'cy', '2', '3', '4'],
                         sep=' ')
    return file


def IoU(box1, box2):
    # box = (lx, ly, w, h)
    box1_area = (box1[4]) * (box1[5])
    box2_area = (box2[4]) * (box2[5])

    # obtain x1, y1, x2, y2 of the intersection
    x1 = max(box1[2], box2[2])
    y1 = max(box1[3], box2[3])
    x2 = min(box1[2] + box1[4], box2[2] + box1[4])
    y2 = min(box1[3] + box1[5], box2[3] + box1[5])

    # compute the width and height of the intersection
    w = max(0, x2 - x1 + 1)
    h = max(0, y2 - y1 + 1)

    inter = w * h
    iou = inter / (box1_area + box2_area - inter)
    return iou


def analysis(save_txt_path, iou_fps, places, dir_path, vid_name):
    # 저장된 파일들 경로
    save_dir_path = dir_path
    # json.loads를 사용해서 딕셔너리 형태로 키: 위치 이름, 값 : 좌표 값
    place = str(places)
    place = json.loads(place)
    file = df_file(save_txt_path)
    file.drop(['2', '3', '4'], inplace=True, axis=1)

    stay_frame = 0
    visit_time = 0

    # 임의로 지정, 웹에서 받아와야 함
    place_list = list(place.values())  # 위치 좌표 값을 리스트 형태로

    place_list = np.array(place_list)
    # [반려동물 별(접근 인덱스)[장소별(접근 인덱스) [방문시간, 횟수]]]
    time_list = np.zeros((len(custom_labels), place_list.shape[0], 2))

    for i in range(len(custom_labels)):
        ### 각 클래스 별로 불러오기
        class_id = (file.track_id == i + 1)
        # class_file : 클래스 별 필요한 전체 정보
        class_file = file[class_id]
        # frame : frame 정보만 가져옴
        frame = class_file.drop(['track_id', 'bbox_left', 'bbox_top', 'w', 'h', 'cx', 'cy'], inplace=False, axis=1)
        # df의 인덱싱을 위해 인덱스 초기화
        class_file.reset_index(level=None, drop=True, inplace=False, col_level=0, col_fill='')
        frame.reset_index(level=None, drop=True, inplace=False, col_level=0, col_fill='')
        np_class_file = class_file.to_numpy()

        ### 프레임 별로 분석
        for j in range(len(class_file)):
            if ((j + 1) >= len(class_file)):
                break

            this_frame = frame.iloc[j, 0]
            next_frame = frame.iloc[j + 1, 0]

            pet = np_class_file[j]
            next_pet = np_class_file[j + 1]

            for k in range(len(place_list)):
                iou = IoU(pet, place_list[k])
                next_iou = IoU(next_pet, place_list[k])
                if (iou > 0.2):
                    time_list[i, k, 0] += 1
                    if ((this_frame + 1 == next_frame) & (next_iou < 0.2)):
                        time_list[i, k, 1] += 1
                    elif (this_frame + 1 != next_frame):
                        time_list[i, k, 1] += 1

        for n in range(len(place_list)):
            time_list[i, n, 0] = time_list[i, n, 0] / iou_fps
            if (time_list[i, n, 0] and time_list[i, n, 1] == 0):
                time_list[i, n, 1] = 1

    # 위치 정보에 대한 값을 리스트로 (장소 딕셔너리의 키로 사용)
    space = list(place.keys())

    # 객체 별 장소 딕셔너리를 담은 리스트 [{사료 : [시간, 방문횟수], 화장실 :[시간, 방문 횟수]}]
    space_list = []

    # json 형태로 변환 하기 위해서 time_list 타입을 array에서 list로
    ls_time_list = time_list.tolist()

    # 객체 별 장소 딕셔너리를 담은 리스트 [{사료 : [시간, 방문횟수], 화장실 :[시간, 방문 횟수]}]
    for i in range(len(custom_labels)):
        space_list.append(dict(zip(space, list(ls_time_list[i]))))

    # 객체 정보 까지 담은 장소 딕셔너리 {kkamang :{사료 : [시간, 방문횟수], 화장실 :[시간, 방문 횟수]}, ruby :{화장실 : [시간, 방문횟수], 사료 :[시간, 방문 횟수]} }
    place_dict = dict(zip(custom_labels, space_list))

    # json 파일 저장 
    save_json_path = str(save_dir_path) + "/" + str(vid_name) + "_visit.json"

    with open(save_json_path, 'w') as outfile:
        json.dump(place_dict, outfile, ensure_ascii=False, indent=4)

    return (time_list)