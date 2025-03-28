from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView
from rest_framework.pagination import PageNumberPagination
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Product
from .serializers import ProductSerializer

class CustomPagination(PageNumberPagination):
    page_size = 10  # Set default page size
    page_size_query_param = 'page_size'  # Allow users to override the page size
    max_page_size = 100  # Prevent excessive load

class ProductListView(ListCreateAPIView):
    # Handles listing and creating products
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    pagination_class = CustomPagination  # Apply pagination

class ProductDetailView(RetrieveUpdateDestroyAPIView):
    # Handles retrieving, updating, and deleting a product
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
