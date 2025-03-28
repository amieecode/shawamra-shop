from django.urls import path
from .views import OrderListCreateView, OrderDetailedView

urlpatterns = [
    path('', OrderListCreateView.as_view(), name="order_list"),
    path('<int:pk>/', OrderDetailedView.as_view(), name="order_detail"),
]
