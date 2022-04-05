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
        try:
            listings = Listing.objects.all()
        except Listing.DoesNotExist:
            return Response([])
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = ListingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class WishlistListingsForUser(APIView):
    def get(self, request, username):
        try:
            listings = WishlistListing.objects.filter(user__username=username)
        except Listing.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        serializer = WishlistListingSerializer(listings, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = WishlistListing(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetListingsForUser(APIView):
    def get(self, request, username):
        listings = Listing.objects.filter(user__username=username)
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data)

class PutDeleteListingsForUser(APIView):
    def put(self, request, username, title):
        listing = Listing.objects.get(user__username=username, title=title)
        if listing == None:
            return Response(status=status.HTTP_204_NO_CONTENT)
        serializer = ListingSerializer(listing, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, username, title):
        listing = Listing.objects.get(user__username=username, title=title)
        listing.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

class UserList(APIView):
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = User(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)