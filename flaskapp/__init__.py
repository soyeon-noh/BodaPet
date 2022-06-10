from flask import Flask, request
import os
# 경로를 모두 현재 py 기준으로 맞춰주어야 함

app = Flask(__name__)

@app.route('/yolov5/', methods=['GET', 'POST'])
def yolov5():
    # cmd1=("python ai/yolov5/detect.py --source ai/yolov5/data/images/kkamang.mp4")
    reqFilePath = request.args['filePath']
    temp = "python ai/yolov5/detect.py --source "+reqFilePath
    cmd1=(temp)
    # cmd1=("python ai/yolov5/detect.py --source server/detect_upload/ruby.MOV")
    # cmd1=(text)
    os.system(cmd1)
    # jsonData = request.get_json()
    
    reqPetName = request.args['name']
    print(reqFilePath)
    print(reqPetName)
    return "success"


@app.route('/vgg/', methods=['GET', 'POST'])
def vgg():
     # vgg.py 실행
    cmd2=("python ai/yolov5/vgg.py")
    os.system(cmd2)
    return "분석완료"

@app.route('/deepsort/', methods=['GET', 'POST'])
def deepsort():
    # 경로를 모두 현재 py 기준으로 맞춰주어야 함
    cmd3=("python ai/track.py --source ai/final_test.MOV")
    os.system(cmd3)
    return "분석완료"

# @app.route('/deepsort/', methods=['GET', 'POST'])
# def deepsort():
#     jsonData = request.get_json()   # json 내부에는 [video_name, places]
#     video_name = jsonData[video_name]   # 예시) {"video_name":"deepsort_upload/cctv.mov"}
#     places = jsonData[places]           # 예시) {"places" : [{"사료":[0, 0, 좌x, 좌y, x차이, y차이],"화장실":[0, 0, 1078, 188, 300, 200]}]}
#     place_names = [places.keys()]
#     for name in place_names:
#         places[place_names]
#     cmd3=("python ./al/track.py --source ./al/final_test.MOV")
#     os.system(cmd3)
#     return "분석완료"
    
if __name__ == '__main__':
    app.run(debug=True)