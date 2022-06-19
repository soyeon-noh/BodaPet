from flask import Flask, request
import os
import json
# 경로를 모두 현재 py 기준으로 맞춰주어야 함

app = Flask(__name__)

@app.route('/yolov5/', methods=['GET', 'POST'])
def yolov5():
    # cmd1=("python ai/yolov5/detect.py --source ai/yolov5/data/images/kkamang.mp4")
    reqFilePath = request.args['filePath']
    reqPetName = request.args['name']

    temp = "python yolov5_deepsort/yolov5/detect.py --source server/"+reqFilePath +" --name "+reqPetName
    #temp = "python yolov5_deepsort/yolov5/detect.py --source server/detect_upload/ruby.MOV --name ruby"
    cmd1=(temp)
    os.system(cmd1)
    success = os.popen("python yolov5_deepsort/success.py").read()
   
    # os.system(cmd1)
    # jsonData = request.get_json()
    
    
    #print(reqFilePath)
    #print(reqPetName)
    return success


@app.route('/vgg/', methods=['GET', 'POST'])
def vgg():
     # vgg.py 실행
    cmd2=("python yolov5_deepsort/yolov5/vgg.py")
    os.system(cmd2)
    success = os.popen("python yolov5_deepsort/success.py").read()
    return success

@app.route('/deepsort/', methods=['GET'])
def deepsort():
    # 경로를 모두 현재 py 기준으로 맞춰주어야 함
   
    #print(request.form)
    #reqVideoPath = request.args['filePath']
    #reqArea = request.args['area']
    #reqDate = request.args['date']
    place = {"eat": [0, 0, 300, 347, 281, 172], "toliet":[0, 0, 1078, 188, 300, 200]}
    with open("./places.json", 'w') as outfile:
        json.dump(place, outfile, ensure_ascii=False, indent=4)
    temp = "python yolov5_deepsort/track.py --source server/deepsort_upload/IMG_4814.MOV --date 22-07-01 --places ./places.json"
    #temp = "python yolov5_deepsort/yolov5/track.py --source server/"+reqVideoPath +" --date "+reqDate + "--places ./places.json"
    print(temp)
    cmd3 = (temp)
    print(cmd3)
    os.system(cmd3)

    heatmap_path = "server/im/heatmap.png"
    scatter_path = "server/im/scatter.png"

    move_time_path = 'yolov5_deepsort/runs/track/22-07-01/move.json'
    visit_time_path = 'yolov5_deepsort/runs/track/22-07-01/visit.json'

    
    with open(move_time_path,"r") as move_time_json:
        move_time = json.load(move_time_json)
    
    with open(visit_time_path,"r") as visit_time_json:
        visit_time = json.load(visit_time_json)
    #move_time_json = open(move_time_path, encoding='unicode-escape')
    #move_time = json.load(move_time_json)

    #visit_json = open(visit_time_path, encoding='unicode-escape')
    #visit_time = json.load(visit_json)


    #with open(move_time_path,"r") as move_time_json :
        #move_time = json.load(move_time_json, ensure_ascii=False, indent=4)

    #with open(visit_time_path,"r") as visit_time_json :
        #move_time = json.load(visit_time_json, ensure_ascii=False, indent=4)

    return {"heatmap" : heatmap_path, "scatter" : scatter_path, "move_time" : move_time, "visit_time" : visit_time}

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