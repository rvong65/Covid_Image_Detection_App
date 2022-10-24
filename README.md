# 🦠 Covid_Image_Detection_App
This is a deep-learning based web application built using Django, React, and PyTorch. The application works by uploading an image of an x-ray of the chest area and uses a basic convolutional neural network to classify whether there is a presence of COVID or not. The data used for this project is from https://www.kaggle.com/datasets/pranavraikokte/covid19-image-dataset

![COVID_APP](https://user-images.githubusercontent.com/87782709/197602171-600182fe-eb5b-483e-86bf-a47f21a21772.jpg)

## Setup
### Backend
1. `pip install -r requirements.txt`
2. `python manage.py makemigrations`
3. `python manage.py migrate`
4. `python manage.py runserver`

### Frontend
1. `npm update`
2. `npm start` or `npm run dev`
