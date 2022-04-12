from django.shortcuts import render

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, Listing, WishlistListing, Tag
from .serializers import UserSerializer, ListingSerializer, WishlistListingSerializer, TagSerializer
from server import serializers

class AllListings(APIView):
    def get(self, request):
        title = request.query_params.get('title')
        tag = request.query_params.get('tag')
        description = request.query_params.get('description')
        priceUpper = request.query_params.get('priceH')
        priceLower = request.query_params.get('priceL')
        username = request.query_params.get('username')
        listings = Listing.objects.all()
        if title:
            listings = listings.filter(title__icontains=title)
        if tag:
            listings = listings.filter(tags__name__iexact=tag)
        if description:
            listings = listings.filter(description__icontains=description)
        if priceUpper:
            listings = listings.filter(price__lte=priceUpper)
        if priceLower:
            listings = listings.filter(price__gte=priceLower)
        if username:
            listings = listings.filter(user__username__iexact=username)
        serializer = ListingSerializer(listings, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = ListingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def put(self, request):
        title = request.query_params.get('title')
        userID = request.query_params.get('userID')
        if title and userID:
            listing = Listing.objects.get(title=title, user=userID)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if listing is None:
            return Response(status=status.HTTP_204_NO_CONTENT)
        serializer = ListingSerializer(listing, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request):
        title = request.query_params.get('title')
        userID = request.query_params.get('userID')
        if title and userID:
            listing = Listing.objects.get(title=title, user=userID)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        listing.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

class WishlistListings(APIView):
    def get(self, request):
        username = request.query_params.get('username')
        listings = Listing.objects.all()
        if username:
            listings = listings.filter(user__username__exact=username)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        serializer = WishlistListingSerializer(listings, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = WishlistListing(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request):
        listingID = request.query_params.get('listingID')
        userID = request.query_params.get('userID')
        if listingID and userID:
            listing = WishlistListing.objects.get(listing=listingID, user=userID)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        listing.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

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
    def put(self, request):
        username = request.query_params.get('username')
        if username:
            listing = User.objects.get(username__exact=username)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if listing is None:
            return Response(status=status.HTTP_204_NO_CONTENT)
        serializer = ListingSerializer(listing, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request):
        username = request.query_params.get('username')
        if username:
            listing = User.objects.get(username__exact=username)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        listing.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

class Tags(APIView):
    def get(self, request):
        tags = Tag.objects.all()
        serializer = TagSerializer(tags, many=True)
        return Response(serializer.data)
    def post(self, request):
        serializer = TagSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request):
        name = request.query_params.get('name')
        if name:
            tag = Tag.objects.get(name__exact=name)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        tag.delete()
        return Response(status=status.HTTP_202_ACCEPTED)