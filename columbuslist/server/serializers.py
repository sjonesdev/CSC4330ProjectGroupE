from unittest.util import _MAX_LENGTH
from rest_framework import serializers
from .models import User, Listing, WishlistListing, Tag

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=(["username", "password"])

class WishlistListingSerializer(serializers.ModelSerializer):
    class Meta:
        model=WishlistListing
        fields=("listingTitle", "username", "price")

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model=Tag
        fields=(["name"])

class ListingSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)
    #title = serializers.CharField(max_length=255)
    #description = serializers.CharField(max_length=255)
    #price = serializers.DecimalField(max_digits=10, decimal_places=2)
    #contact = serializers.CharField(max_length=255)

    class Meta:
        model=Listing
        fields=("title", "description", "price", "contact", "user", "tags")

    #    def update(self, instance, validated_data):
    #        print(validated_data)
    #        instance.title = validated_data.get('title', instance.title)
    #        instance.description = validated_data.get('description', instance.description)
    #        instance.price = validated_data.get('price', instance.price)
    #        instance.contact = validated_data.get('contact', instance.contact)
    #        instance.tags = validated_data.get('tags', instance.tags)
    #        instance.save()
    #        return instance