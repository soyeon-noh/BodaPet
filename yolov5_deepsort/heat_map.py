from scipy import ndimage
import pandas as pd
import cv2
import glob

import matplotlib.pyplot as plt
import numpy as np
from skimage import transform

def add(image, heat_map, alpha=0.6, display=False, save=None, cmap='viridis', axis='on', verbose=False):

    height = image.shape[0]
    width = image.shape[1]

    # resize heat map
    heat_map_resized = transform.resize(heat_map, (height, width))

    # normalize heat map
    max_value = np.max(heat_map_resized)
    min_value = np.min(heat_map_resized)
    normalized_heat_map = (heat_map_resized - min_value) / (max_value - min_value)

    # display
    # plt 초기화
    plt.clf()
    plt.imshow(image)
    plt.imshow(255 * normalized_heat_map, alpha=alpha, cmap=cmap)
    plt.axis(axis)

    if display:
        plt.show()

    if save is not None:
        if verbose:
            print('save image: ' + save)
        plt.savefig(save, bbox_inches='tight', pad_inches=0, dpi=300)

def make_heatmap(save_txt_path, dir_path, rgb_img):
  # bgr, rgb 형태로
  im_rgb = cv2.cvtColor(rgb_img, cv2.COLOR_BGR2RGB)
  # 저장된 텍스트 파일
  txt_path = save_txt_path
  # 저장된 파일들 경로
  save_dir_path = dir_path
  # 저장된 텍스트 파일 가져오기
  file_list = glob.glob(txt_path)
  file_list_py = [file for file in file_list if file.endswith(".txt")]


  # 텍스트 파일을 데이터 프레임 형태로 불러오기
  file = pd.read_table(file_list_py[0], header=None,
                  names=['frame', 'track_id', 'bbox_left', 'bbox_top', 'w', 'h', 'cx', 'cy', '2', '3', '4'],
                  sep=' ')
  files=file.drop(['frame', 'track_id', 'bbox_left', 'bbox_top', 'w', 'h','2', '3', '4'], inplace=False, axis=1)
  files_numpy = files.to_numpy()

  # create heat map
  height = im_rgb.shape[0]
  width = im_rgb.shape[1]
  x = np.zeros((height, width))
  for i in files_numpy :
    x[int(i[1]),int(i[0])] = 1
  heat_map = ndimage.filters.gaussian_filter(x, sigma=16)
  # 이미지 저장 경로 수정
  save_img_path = str(save_dir_path) + "/heatmap.png"

  add(im_rgb, heat_map, alpha=0.6, save=save_img_path, axis = False)