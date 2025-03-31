from django.urls import path
from .views import CartListView, AddToCartView, UpdateCartView, RemoveFromCartView, ClearCartView

urlpatterns = [
    path('', CartListView.as_view(), name='cart-list'),
    path('add/', AddToCartView.as_view(), name='add-to-cart'),
    path('<int:pk>/', UpdateCartView.as_view(), name='update-cart'),
    path('<int:pk>/remove/', RemoveFromCartView.as_view(), name='remove-cart-item'),
    path('clear/', ClearCartView.as_view(), name='clear-cart')
]