from rest_framework import generics
from .models import product
from .serializers import productSerializer

# Create your views here.
class productList(generics.ListCreateAPIView):
    # Handles listing all products and creating a new products 
    queryset = product.objects.all()
    serializer_class = productSerializer

class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    # Handles retrieving, updating and deleting a specific product
    queryset = product.objects.all()
    serializer_class = productSerializer