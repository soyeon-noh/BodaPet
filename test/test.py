# -*- coding: utf8 -*-
import sys
import json


def run(weights='best.pt',  # model.pt path(s)
        source=sys.argv[1],  # file/dir/URL/glob, 0 for webcam
        data='data/coco128.yaml',  # dataset.yaml path
        imgsz=(640, 640),  # inference size (height, width)
        conf_thres=0.5,  # confidence threshold
        iou_thres=0.45,  # NMS IOU threshold
        max_det=1000,  # maximum detections per image
        device='',  # cuda device, i.e. 0 or 0,1,2,3 or cpu
        view_img=False,  # show results
        save_txt=False,  # save results to *.txt
        save_conf=False,  # save confidences in --save-txt labels
        save_crop=True,  # save cropped prediction boxes
        nosave=False,  # do not save images/videos
        classes=None,  # filter by class: --class 0, or --class 0 2 3
        agnostic_nms=False,  # class-agnostic NMS
        augment=False,  # augmented inference
        visualize=False,  # visualize features
        update=False,  # update all models
        project='runs/detect',  # save results to project/name
        name=sys.argv[2],  # save results to project/name
        exist_ok=False,  # existing project/name ok, do not increment
        line_thickness=3,  # bounding box thickness (pixels)
        hide_labels=False,  # hide labels
        hide_conf=False,  # hide confidences
        half=False,  # use FP16 half-precision inference
        dnn=False,  # use OpenCV DNN for ONNX inference
        ):
    data = {
        'source': source,
        'name': name,
    }
    print(data)


def main(source, name):
    run(source, name)


if __name__ == "__main__":
    main(sys.argv[1], sys.argv[2])


# print('파이썬 파일에 접근했습니다.')


# def func1(a):
#     print('저는',a,'입니다')



# import argparse
# from pathlib import Path
# FILE = Path(__file__).resolve()
# ROOT = FILE.parents[0]
# def parse_opt():
#     parser = argparse.ArgumentParser()
#     parser.add_argument('--source', type=str, default=ROOT / 'data/images', help='file/dir/URL/glob, 0 for webcam')
#     parser.add_argument('--name', default='exp', help='save results to project/name')

# opt = parse_opt()


# def main(**vars(opt)):
#     print('성공')

# if __name__ == '__main__':
#     func1(sys.argv[1])