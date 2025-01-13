from django.db import models
from products.models import Product

# Create your models here.
class Order(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="orders")
    quantity = models.PositiveIntegerField()
    customer_name = models.CharField(max_length=225)
    customer_email = models.EmailField()
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"order {self.id} - {self.customer_name}"
    