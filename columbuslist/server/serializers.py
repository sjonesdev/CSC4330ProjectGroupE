from rest_framework import serializers
from .models import User, Listing, WishlistListing

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=(["username"])

class ListingSerializer(serializers.ModelSerializer):
    class Meta:
        model=Listing
        fields=("title", "description", "price", "contact", "user")

class WishlistListingSerializer(serializers.ModelSerializer):
    class Meta:
        model=WishlistListing
        fields=("listing", "user")