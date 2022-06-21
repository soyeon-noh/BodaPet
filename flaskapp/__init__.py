from flask import Flask, request
import os
import json
import string
import random
import numpy as np

# 경로를 모두 현재 py 기준으로 맞춰주어야 함

app = Flask(__name__)

app.config['JSON_AS_ASCII'] = False
@app.route('/yolov5/', methods=['GET', 'POST'])
def yolov5():

    # 디텍할 영상 경로
    reqFilePath = request.args['filePath']
    # 등록한 뱐려동물 이름
    reqPetName = request.args['name']

    temp = "python yolov5_deepsort/yolov5/detect.py --source server/"+reqFilePath +" --name "+reqPetName
   
    cmd1=(temp)
    os.system(cmd1)
    success = os.popen("python yolov5_deepsort/success.py").read()
       
    return success


@app.route('/vgg/', methods=['GET', 'POST'])
def vgg():
    # vgg.py 실행
    cmd2=("python yolov5_deepsort/yolov5/vgg.py")
    os.system(cmd2)
    success = os.popen("python yolov5_deepsort/success.py").read()
    return success

@app.route('/deepsort', methods=['POST'])
def deepsort():
    
    string_pool = string.digits

    st_val =''
    for i in range(4):
        st_val += random.choice(string_pool)

    # 경로를 모두 현재 py 기준으로 맞춰주어야 함

    reqJson = request.get_json()
    # 분석할 영상 경로
    reqVideoPath = reqJson['filePath']
    # 지정구역 좌표
    reqArea = reqJson['area']
    # 날짜
    reqDate = reqJson['date']
    place = {'밥그릇': [0, 0, 300, 347, 281, 172], '화장실':[0, 0, 1078, 188, 300, 200]}
    with open("./places.json", 'w', encoding='utf-8') as outfile:
        json.dump(reqArea, outfile, ensure_ascii=False, indent=4)
    

    temp = "python yolov5_deepsort/track.py --source server/"+reqVideoPath +" --date "+reqDate + " --places ./places.json --rns " + st_val 
    cmd3 = (temp)

    os.system(cmd3)
 

   
    # 히트맵 경로
    heatmap_path = 'im/'+st_val+'_heatmap.png'
    # 스캐터 경로
    scatter_path = 'im/'+st_val+'_scatter.png'


    move_time_path = 'yolov5_deepsort/runs/track/'+reqDate+'/'+st_val+'_move.json'
    visit_time_path = 'yolov5_deepsort/runs/track/'+reqDate+'/'+st_val+'_visit.json'



    with open(move_time_path,"r", encoding='UTF-8') as move_time_json:
        move_time = json.load(move_time_json)
        

    move_time_list = []
    move_keys_list = list(move_time.keys())
    move_values_list = list(move_time.values())
    for i in range(len(move_time.keys())):
        move_time_list.append([move_keys_list[i], move_values_list[i]])
       
  
   
    with open(visit_time_path,"r", encoding='UTF-8') as visit_time_json:
        visit_time = json.load(visit_time_json)
        
    
    vt_k_ls = list(visit_time.keys())
    vt_v_ls = list(visit_time.values())


    # 반복문으로 반려 동물의 등록 갯수 만큼 갱신 되게
    vt_v_ls_f_k_ls = list(vt_v_ls[0].keys())
    


    area_list = []
    
    # 등록한 반려 동물 갯수
    for i in range(len(vt_k_ls)):
        # 영역별 갯수
        for j in range(len(vt_v_ls_f_k_ls)):
            area_list.append(dict(zip(['name','value'],[vt_v_ls_f_k_ls[j],list(vt_v_ls[i].values())[j]])))

    area_np = np.array(area_list).reshape(len(vt_k_ls),len(vt_v_ls_f_k_ls))
    final_area_list = area_np.tolist()
    visit_time_list = []

    for i in range(len(vt_k_ls)):
        visit_time_list.append(dict(zip(['name','area'],[vt_k_ls[i],final_area_list[i]])))
  
    # 등록한 반려 동물 갯수
    for i in range(len(vt_k_ls)):
        # 등록한 영역 갯수
        for j in range(len(vt_v_ls_f_k_ls)):
            # 방문시간, 횟수
            for k in range(2):
                visit_time_list[i]['area'][j]['value'][k]=int(visit_time_list[i]['area'][j]['value'][k])


    return {'heatmap' : heatmap_path, 'scatter' : scatter_path, 'move_time' : move_time_list, 'visit_time': visit_time_list}



    
if __name__ == '__main__':
    app.run(debug=True)