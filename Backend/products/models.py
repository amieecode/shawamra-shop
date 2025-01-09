from django.db import models

# Create your models here.
class product(models.Model):
    # Define a product with fields 
    name = models.CharField(max_length=100)
    description = models.TextField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    image = models.ImageField(upload_to='products/', null=True, blank=True) # Upload images to the products/' folder


    def __str__(self):
        return self.name