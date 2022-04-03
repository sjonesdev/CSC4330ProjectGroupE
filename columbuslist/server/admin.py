from django.contrib import admin
from .models import User, Listing, WishlistListing

admin.site.register(User)
admin.site.register(Listing)
admin.site.register(WishlistListing)