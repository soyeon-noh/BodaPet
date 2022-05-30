from keras.preprocessing.image import ImageDataGenerator
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