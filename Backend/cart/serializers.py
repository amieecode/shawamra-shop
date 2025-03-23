from rest_framework import serializers
from .models import Cart, CartItem
from products.serializer import ProductSerializer
from products.models import Product

class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)
    product_id = serializers.PrimaryKeyRelatedField(
        queryset = Product.objects.all(), source="product", write_only = True
    )
    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_id', 'quantity', 'total']

class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)

    class Meta:
        model = Cart
        fields = ['id', 'created_at', 'items']