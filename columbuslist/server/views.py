from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import User, Listing, WishlistListing, Tag
from .serializers import UserSerializer, ListingSerializer, WishlistListingSerializer, TagSerializer

class AllListings(APIView):
    def get(self, request):
        keywords = request.query_params.get('keywords')
        if keywords:
            keywords = keywords.split()
        title = request.query_params.get('title')
        tag = request.query_params.get('tag')
        description = request.query_params.get('description')
        priceUpper = request.query_params.get('priceH')
        priceLower = request.query_params.get('priceL')
        username = request.query_params.get('username')
        listings = Listing.objects.all()

        if keywords:
            for keyword in keywords:
                listings = listings.filter(title__icontains=keyword)

        if title:
            listings = listings.filter(title__icontains=title)
        if tag:
            listings = listings.filter(tags__icontains=tag)
        if description:
            listings = listings.filter(description__icontains=description)
        if priceUpper:
            listings = listings.filter(price__lte=priceUpper)
        if priceLower:
            listings = listings.filter(price__gte=priceLower)
        if username:
            listings = listings.filter(username__iexact=username)
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
        username = request.query_params.get('username')
        if title and username:
            listing = Listing.objects.get(title=title, username=username)
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
        username = request.query_params.get('username')
        if title and username:
            listing = Listing.objects.get(title=title, username=username)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        listing.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

class WishlistListings(APIView):
    def get(self, request):
        username = request.query_params.get('username')
        listings = Listing.objects.all()
        if username:
            listings = listings.filter(username=username)
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

    def put(self, request):
        title = request.query_params.get('title')
        username = request.query_params.get('username')
        if title and username:
            listing = WishlistListing.objects.get(listingTitle=title, username=username)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        if listing is None:
            return Response(status=status.HTTP_204_NO_CONTENT)
        serializer = WishlistListingSerializer(listing, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request):
        title = request.query_params.get('title')
        username = request.query_params.get('username')
        if title and username:
            listing = WishlistListing.objects.get(listingTitle=title, username=username)
        else:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        listing.delete()
        return Response(status=status.HTTP_202_ACCEPTED)

class UserList(APIView):
    def options(self, request):
        return Response({
            "name": "All Users",
            "description": "",
            "renders": [
                "application/json",
                "text/html"
            ],
            "parses": [
                "application/json",
                "application/x-www-form-urlencoded",
                "multipart/form-data"
            ],
            "Access-Control-Allow-Origin": "http://localhost:3000/"
        })
    def get(self, request):
        username=request.query_params.get("username")
        users = User.objects.all()
        if username:
            users=users.filter(username=username)
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    def post(self, request):
        data = request.data
        if data["username"]:
            username = data["username"]
            if len(username)<=13 or username[-13:]!="@columbus.edu" :
                    return Response(status=status.HTTP_400_BAD_REQUEST)    
        if not data["password"]:
            return Response(status=status.HTTP_400_BAD_REQUEST)                                               
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def options(self, request):
        return Response({
            "name": "All Users",
            "description": "",
            "renders": [
                "application/json",
                "text/html"
            ],
            "parses": [
                "application/json",
                "application/x-www-form-urlencoded",
                "multipart/form-data"
            ],
            'Access-Control-Allow-Origin': '*'
        })

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
    
class Login(APIView):
    def post(self, request):
        data = request.data
        username = data["username"]
        password = data["password"]
        users = User.objects.all()
        if username:
            users = users.filter(username=username)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        if password:
            users = users.filter(password=password)
        else:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        if len(users) != 1:
            return Response(status=status.HTTP_401_UNAUTHORIZED)
        return Response(status=status.HTTP_200_OK)
    def get(self, request):
        users = User.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)
    