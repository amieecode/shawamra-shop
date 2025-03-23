from django.db import models
from django.conf import settings
from django.contrib.auth.models import User
from products.models import Product

# Create your models here.
class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='cart') 
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username}'s cart"
    
    def total_price(self):
        """ Calculate total price of all items in the cart"""
        return sum(item.total for item in self.items.all())
        

class CartItem(models.Model):
    cart = models.ForeignKey(Cart, on_delete=models.CASCADE, related_name='items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.PositiveIntegerField(default=1)
    stock = models.PositiveIntegerField(default=0) 
    
    def __str__(self):
        return f"{self.quantity} x {self.product.name}"

    @property
    def total(self):
        return self.quantity * self.product.price