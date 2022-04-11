from django.urls import path, include
from . import views
from knox import views as knox_views
from columbuslist.users import views

urlpatters = [
    path('/login/', views.login_api),
    #path('api/', include('users.urls'))
    path('user/', views.get_user_data),
    path('register/', views.get_user_data),
    path('logout/', knox_views.LogoutView.as_view()),
    #Logout user from all devices
    path('logoutall/', knox_views.LogoutAllViews.as_view())
]