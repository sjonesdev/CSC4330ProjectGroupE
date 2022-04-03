from django.shortcuts import render

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, Listing, WishlistListing
from .serializers import UserSerializer, ListingSerializer, WishlistListingSerializer
from server import serializers

class AllListings(APIView):
    def get(self, request):
        listings = Listing.objects.all()
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data)

class WishlistListingsForUser(APIView):
    def get(self, request, username):
        listings = WishlistListing.objects.filter(username=username)
        serializer = WishlistListingSerializer(listings, many=True)
        return Response(serializer.data)

class ListingsForUser(APIView):
    def get(self, request, username):
        listings = Listing.objects.filter(username=username)
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data)

class UserList(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    def post(self):
        pass