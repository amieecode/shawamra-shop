from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, status
from .models import Order, OrderItem
from .serializer import OrderSerializers, OrderItemSerializers
from products.models import Product

# Create your views here.
class OrderListCreateView(generics.ListCreateAPIView):
    # Authenticated user can view the orders
    serializer_class = OrderSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    
    def create(self, request, *args, **kwargs):
        # create order
        user = request.user
        items = request.data.get('items', [])

        if not items:
            return Response({"error": "No items in order"}, status=status.HTTP_400_BAD_REQUEST)
        
        order = Order.objects.create(user=user)

        # order item
        order_items = []
        for item in items:
            try:
                product = Product.objects.get(id=item['product'])
                order_items.append(OrderItem(
                    order=order,
                    product= product,
                    quantity = item['quantity'],
                    price = product.price
                ))
            except Product.DoesNotExist:
                return Response({"error": f"Product with ID{item['product']} not found"}, status=status.HTTP_400_BAD_REQUEST)
        
        OrderItem.object.bulk_create(order_items)
        return Response(OrderSerializers(order).data, status=status.HTTP_201_CREATED)

class OrderDetailedView(generics.RetrieveAPIView):
    # retrieve or update order 
    serializer_class = OrderSerializers
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Order.objects.filter(user=self.request.user)
    
    def update(self, request, *args, **kwargs):
        # only allow updating order
        order = self.get_object()
        if 'status' in request.data:
            order.status = request.data['status']
            order.save()
        return Response(OrderSerializers(order).data)