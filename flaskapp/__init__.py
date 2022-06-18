from flask import Flask, request
import os
# 경로를 모두 현재 py 기준으로 맞춰주어야 함

app = Flask(__name__)

@app.route('/yolov5/', methods=['GET', 'POST'])
def yolov5():
    # cmd1=("python ai/yolov5/detect.py --source ai/yolov5/data/images/kkamang.mp4")
    reqFilePath = request.args['filePath']
    reqPetName = request.args['name']

    temp = "python yolov5_deepsort/yolov5/detect.py --source "+reqFilePath +" --name "+reqPetName
    cmd1=(temp)
    os.system(cmd1)
    
    # cmd1=("python yolov5_deepsort/yolov5/detect.py --source server/detect_upload/ruby.MOV --name ruby")
    # os.system(cmd1)
    # jsonData = request.get_json()
    
    
    #print(reqFilePath)
    #print(reqPetName)
    return "success"


@app.route('/vgg/', methods=['GET', 'POST'])
def vgg():
     # vgg.py 실행
    cmd2=("python yolov5_deepsort/yolov5/vgg.py")
    os.system(cmd2)
    return "분석완료"

@app.route('/deepsort/', methods=['GET', 'POST'])
def deepsort():
    # 경로를 모두 현재 py 기준으로 맞춰주어야 함
   
    place = {"eat": [0, 0, 300, 347, 281, 172], "toilet":[0, 0, 1078, 188, 300, 200]}
    with open("./places.json", 'w') as outfile:
        json.dump(place, outfile, ensure_ascii=False, indent=4)
    temp = "python yolov5_deepsort/track.py --source server/deepsort_upload/IMG_4814.MOV --date 22-06-20 --places ./places.json"
    cmd3 = (temp)
    print(cmd3)
    os.system(cmd3)
    return "분석완료"
    
if __name__ == '__main__':
    app.run(debug=True)