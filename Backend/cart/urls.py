from django.urls import path
from .views import CartListView, AddToCartView, UpdateCartView, RemoveFromCartView, ClearCartView

urlpatterns = [
    path('', CartListView.as_view(), name='cart-list'),
    path('add/', AddToCartView.as_view(), name='add-to-cart'),
    path('update/<int:pk>/', UpdateCartView.as_view(), name='update-cart'),
    path('remove/<int:pk>/', RemoveFromCartView.as_view(), name='remove-cart'),
    path('clear/', ClearCartView.as_view(), name='clear-cart')
] 