from django.db import models

class User(models.Model):
    username=models.CharField(max_length=255)
    password=models.CharField(max_length=255)

    def __str__(self):
        return self.username

class Listing(models.Model):
    title=models.CharField(max_length=255, blank=False)
    description=models.CharField(max_length=255, blank=False)
    price=models.DecimalField(max_digits=10, decimal_places=2)
    contact=models.CharField(max_length=255)
    #username=models.ForeignKey(User, on_delete=models.CASCADE)
    username=models.CharField(max_length=255, blank=False)

    def __str__(self):
        return self.title

class WishlistListing(models.Model):
    listingID=models.IntegerField()
    username=models.CharField(max_length=255, blank=False)

    def __str__(self):
        return f"{self.listingID}"
