from keras.preprocessing.image import ImageDataGenerator
from keras import optimizers
from keras.models import Sequential
from keras.layers import Dropout, Flatten, Dense
from keras.models import Model
from keras import models
from keras import layers
import keras.backend as K
from keras.applications import vgg16
from tensorflow import keras

train_dir = 'yolov5/runs/detect'

batch_size = 32
image_size = 224

# 학습에 사용될 이미지 데이터 생성기
train_datagen = ImageDataGenerator(
    rotation_range=180,  # 회전 쵀대 20도
    width_shift_range=0.2,  # 좌우 이동
    height_shift_range=0.2,  # 상하 이동
    horizontal_flip=True,  # 좌우 반전
    vertical_flip=True,  # 상하 반전
)

# 학습에 사용될 데이터 생성기
train_generator = train_datagen.flow_from_directory(
        train_dir,
        target_size=(image_size, image_size),
        batch_size=batch_size,
        class_mode='categorical',
        shuffle=True)


class_num=len(train_generator.class_indices)

custom_labels = list(train_generator.class_indices.keys())

K.clear_session() # 새로운 세션으로 시작

# 모델 불러오기
conv_layers = vgg16.VGG16(weights='imagenet', include_top=False, input_shape=(image_size, image_size, 3))

# Convolution Layer를 학습되지 않도록 고정 
for layer in conv_layers.layers:
    layer.trainable = False

# 새로운 모델 생성하기
model = models.Sequential()

# VGG16모델의 Convolution Layer를 추가
model.add(conv_layers)
 
# 모델의 Fully Connected 부분을 재구성
model.add(layers.Flatten())
model.add(layers.Dense(1024, activation='relu'))
model.add(layers.Dropout(0.5))
model.add(layers.Dense(class_num, activation='softmax'))


adam = keras.optimizers.Adam(learning_rate=1e-4)

# 모델 컴파일
model.compile(loss='categorical_crossentropy',
              optimizer=adam,
              metrics=['acc'])

# 모델 학습
history = model.fit(
      train_generator,
      steps_per_epoch=train_generator.samples/train_generator.batch_size ,
      epochs=5,
      #validation_data=validation_generator,
      #validation_steps=validation_generator.samples/validation_generator.batch_size,
      verbose=1)
 
# 모델 저장
vgg16_model_path = 'vgg16.h5'
model.save(vgg16_model_path)
