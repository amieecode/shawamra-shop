from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response 
from rest_framework import status
from products.models import Product
from cart.models import Cart
from .serializers import CartSerializer

# Create your views here.
class CartListView(APIView):
    # get cart item
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Retrieve user's cart
        cart_items = Cart.objects.filter(user=request.user)
        serializer = CartSerializer(cart_items, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class AddToCartView(APIView):
    # Adding product to cart and updating the cart
    permission_classes = [IsAuthenticated]

    def post(self, request):
        product_id = request.data.get('product_id')
        quantity = int(request.data.get('quantity', 1))

        try:
            product = Product.objects.get(id=product_id)
        except Product.DoesNotExist:
            return Response({'error': "Product not found"}, status=status.HTTP_404_NOT_FOUND)
        
        cart_item, created = Cart.objects.get_or_create(user=request.user, product=product)
        if not created:
            cart_item.quantity += quantity
        else:
            cart_item.quantity = quantity

        cart_item.save()
        return Response({"message": "Product add to cart"}, status=status.HTTP_201_CREATED)

class UpdateCartView(APIView):
    # update the quantity of the cart
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
    
        try:
            cart_item = Cart.objects.get(pk=pk, user=request.user)
        except Cart.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

        new_quantity = request.data.get("quantity")
        if new_quantity and int(new_quantity) > 0:
            cart_item.quantity = int(new_quantity)
            cart_item.save()
            return Response({"message": "Cart updated successfully"}, status=status.HTTP_200_OK)
        return Response({"error": "Invalid quantity"}, status=status.HTTP_400_BAD_REQUEST)
    
class RemoveFromCartView(APIView):
    # Remove an item from the cart
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            cart_item = Cart.objects.get(pk=pk, user=request.user)
            cart_item.delete()
            return Response({"message": "Item removed from the cart"}, status=status.HTTP_204_NO_CONTENT)
        except Cart.DoesNotExist:
            return Response({"error": "Cart item not found"}, status=status.HTTP_404_NOT_FOUND)

class ClearCartView(APIView):
    # Clear item in the cart
    permission_classes = [IsAuthenticated]

    def delete(self, request):
        Cart.objects.filter(user=request.user).delete()
        return Response({"message": "Cart cleared"}, status=status.HTTP_204_NO_CONTENT)