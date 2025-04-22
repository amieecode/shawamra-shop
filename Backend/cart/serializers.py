from rest_framework import serializers
from .models import Cart
from products.models import Product
from products.serializers import ProductSerializer

class CartSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    total_price = serializers.SerializerMethodField() # Total cost of the item 


    class Meta:
        model = Cart
        fields = ['id','user', 'product', 'product_name', 'quantity', 'total_price']
        read_only_field = ['user', 'product_name', 'total_price']

    def get_total_price(self, obj):
        return obj.total_price() # return the calculated price 
    
class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer(read_only=True)

    class Meta: 
        model = Cart
        fields = ['id', 'product', 'quantity', 'total_price']