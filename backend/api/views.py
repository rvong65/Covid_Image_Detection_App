from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
from .model import *
from PIL import Image
import io
import time

# Send model's response
class ImageUploadView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format="json"):
        try:
            file = Image.open(io.BytesIO(request.FILES['image'].read()))
            image_path = "./media/images/image.png"
            file.save(image_path)
            time.sleep(5)
            image = preprocessImage(file)
            predicted_class= predict(image)
            createPredictedImage(image_path, predicted_class)
            response = createResponse(predicted_class)
            time.sleep(2)
            return Response(response)
        except:
            return Response("Failed")

        
