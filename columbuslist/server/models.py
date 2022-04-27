from django.db import models

class User(models.Model):
    username=models.CharField(max_length=255)
    password=models.CharField(max_length=255)

    def __str__(self):
        return self.username

class Tag(models.Model):
    name=models.CharField(max_length=255)
    #listing=models.ForeignKey(Listing, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.name

class Listing(models.Model):
    title=models.CharField(max_length=255, blank=False)
    description=models.CharField(max_length=255, blank=False)
    price=models.DecimalField(max_digits=10, decimal_places=2)
    contact=models.CharField(max_length=255)
    user=models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    tags=models.ManyToManyField(Tag)

    def __str__(self):
        return self.title

class WishlistListing(models.Model):
    #listing=models.ForeignKey(Listing, on_delete=models.CASCADE, null=True)
    #user=models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    listingTitle = models.CharField(max_length=255, default="blank")
    username = models.CharField(max_length=255, default="blank")
    price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return f"{self.listingTitle} {self.username} {self.price}"