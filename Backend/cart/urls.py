from django.urls import path
from .views import CartItem

urlpatterns = [
    path('carts/', CartView.as_view(), name='cart'),
]
