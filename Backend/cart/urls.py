from django.urls import path
from .views import CartListView, AddToCartView, UpdateCartView, RemoveFromCartView, ClearCartView

urlpatterns = [
    path('cart/', CartListView.as_view(), name='cart-list'),
    path('cart/add/', AddToCartView.as_view(), name='add-to-cart'),
    path('cart/update/<int:pk>/', UpdateCartView.as_view(), name='update-cart'),
    path('cart/remove/<int:pk>/', RemoveFromCartView.as_view(), name='remove-cart-item'),
    path('cart/clear/', ClearCartView.as_view(), name='clear-cart')
]