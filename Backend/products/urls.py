from  django.urls import path
from .views import ProductDetail, productList

urlpatterns = [
    path('products/', productList.as_view(), name='product-list'),
    path()
]
