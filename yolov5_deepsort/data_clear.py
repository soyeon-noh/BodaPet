import os
import shutil

dir_path = "yolov5_deepsort/runs"

if os.path.exists(dir_path):
	shutil.rmtree(dir_path)


dir_path2 = "yolov5_deepsort/yolov5/runs"

if os.path.exists(dir_path2):
	shutil.rmtree(dir_path2)