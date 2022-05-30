import pandas as pd
from matplotlib import image
from matplotlib import pyplot as plt
import numpy as np
import random
import glob
import cv2
# custom_labels 불러오기
from custom_label import custom_labels


def plot(save_txt_path, dir_path, im):
    # bgr, rgb 형태로
    im_rgb = cv2.cvtColor(im, cv2.COLOR_BGR2RGB)
    # 저장된 텍스트 파일
    txt_path = save_txt_path
    # 저장된 파일들 경로
    save_dir_path = dir_path

    # 색깔 리스트 (색깔 중복 여부 확인 하기 위한 리스트)
    colors = []

    # 저장된 텍스트 파일 가져오기
    file_list = glob.glob(txt_path)
    file_list_py = [file for file in file_list if file.endswith(".txt")]

    # 텍스트 파일을 데이터 프레임 형태로 불러오기
    file = pd.read_table(file_list_py[0], header=None,
                         names=['frame', 'track_id', 'bbox_left', 'bbox_top', 'w', 'h', 'cx', 'cy', '2', '3', '4'],
                         sep=' ')

    # 각 트랙 id (객체)로 분리를 위해 조건 변수 만듬 (반복문을 통해서 일반화 : 트랙 id 만큼 글로벌 변수 만듬)
    for i in np.sort(file['track_id'].unique()):
        globals()["condition{}".format(i)] = (file.track_id == i)
        # 각 트랙 id (객체) 조건 변수를 통해 각 트랙 id (객체) 별로 데이터 분리 (반복문을 통해서 일반화 : 트랙 id 만큼 글로벌 변수 만듬)
        globals()["object{}".format(i)] = file.loc[
            globals()["condition{}".format(i)], ['frame', 'track_id', 'bbox_left', 'bbox_top', 'w', 'h', 'cx', 'cy']]
        # 각 트랙 id (객체)의 cx, cy만 추출 (반복문을 통해서 일반화 : 트랙 id 만큼 글로벌 변수 만듬)
        globals()["ob_x{}".format(i)] = globals()["object{}".format(i)]['cx'].values.tolist()
        globals()["ob_y{}".format(i)] = globals()["object{}".format(i)]['cy'].values.tolist()

    # 각 객체 별로 이동 경로 plot으로 형태로 출력 (색깔은 랜덤) 색깔은 우선 랜덤으로 했는데 custom_label 반복문으로 색깔 미리 지정해도 괜찮을듯?
    for i in np.sort(file['track_id'].unique()):
        use_color ="#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)])
        if use_color in colors:
          use_color ="#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)])
        plt.plot(globals()["ob_x{}".format(i)], globals()["ob_y{}".format(i)], color=use_color,
                 label=custom_labels[i - 1], linewidth=4)
        plt.axis('off')
        colors.append(use_color)

    # track.py 에서 저장한 첫 프레임 이미지 사용
    plt.imshow(im_rgb)
    plt.legend()

    # 이미지 저장 경로 수정
    save_img_path = str(save_dir_path) + "/plot1.png"
    plt.savefig(save_img_path, dpi=300)

    # plt 초기화
    plt.clf()

    # 각 객체 별 산점도 형태 출력 (색깔은 랜덤) 색깔은 우선 랜덤으로 했는데 custom_label 반복문으로 색깔 미리 지정해도 괜찮을듯?
    for i in np.sort(file['track_id'].unique()):
        use_color ="#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)])
        if use_color in colors:
          use_color ="#"+''.join([random.choice('0123456789ABCDEF') for j in range(6)])
        plt.scatter(globals()["ob_x{}".format(i)], globals()["ob_y{}".format(i)], color=use_color, alpha=0.06,
                    label=custom_labels[i - 1])
        plt.axis('off')
        colors.append(use_color)

    # track.py 에서 저장한 첫 프레임 이미지 사용
    plt.imshow(im_rgb)
    plt.legend()

    # 이미지 저장 경로 수정
    save_img_path = str(save_dir_path) + "/scatter1.png"
    plt.savefig(save_img_path, dpi=300)
