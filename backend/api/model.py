import torch.nn as nn
import torch.nn.functional as F
import torch
from torchvision.io import read_image
from torchvision.utils import draw_bounding_boxes
import torchvision.transforms as transforms
import os
from PIL import Image

#CNN model
class Model(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 128, 5)
        self.pool = nn.MaxPool2d(2, 2)
        self.conv2 = nn.Conv2d(128, 256, 5)
        self.fc1 = nn.Linear(29*29*256, 128)
        self.fc2 = nn.Linear(128, 64)
        self.fc3 = nn.Linear(64, 2)

    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = torch.flatten(x, 1) 
        x = F.relu(self.fc1(x))
        x = F.relu(self.fc2(x))
        x = self.fc3(x)
        return x

model = Model()


def preprocessImage(image): 
    image = image.convert("RGB")
    transform = transforms.Compose([transforms.Resize((128, 128)), 
                                transforms.ToTensor(), 
                                transforms.Normalize((0.5, 0.5, 0.5), (0.5, 0.5, 0.5))])
    transformed_image = transform(image)
    final_image = transformed_image.unsqueeze(0)
    return final_image

def predict(image):
    model= Model()
    model.load_state_dict(torch.load("./media/model.pth"))
    with torch.no_grad():
        classes = ("Covid", "Normal")
        model.eval()
        output = model(image)
        index = output.numpy().argmax()
        predicted_class = classes[index]
        return predicted_class

def createPredictedImage(image_path, predicted_class):
    image = read_image(image_path)
    transform = transforms.Compose([transforms.Resize((512, 512))])
    image = transform(image)
    box = torch.tensor([ 0, 0, 512, 512], dtype=torch.int).unsqueeze(0)
    if predicted_class == "Normal":
        image = draw_bounding_boxes(image, box, width=5, labels= [predicted_class], colors=(0, 0, 255), fill=True, font="./media/Poppins-Black.ttf", font_size=32)
    else:
        image = draw_bounding_boxes(image, box, width=5, labels= [predicted_class], colors=(255, 0, 0), fill=True, font="./media/Poppins-Black.ttf", font_size=32)
    
    image = transforms.ToPILImage()(image)
    if os.path.exists("../frontend/src/images/prediction.png"):
        os.remove("../frontend/src/images/prediction.png")
        image.save("../frontend/src/images/prediction.png")
    else:
        image.save("../frontend/src/images/prediction.png")

def createResponse(predicted_class):
    if predicted_class == "Covid":
        response ='''The model predicted that this image is classified as Covid. (Please note that this is not medical advice and should be consulted with a professional for an accurate diagnosis)'''
        return response
    else:  
        response = '''The model predicted that this image is classified as Normal (Please note that this is not medical advice and should be consulted with a professional for an accurate diagnosis)'''
        return response
