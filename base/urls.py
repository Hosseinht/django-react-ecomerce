from django.urls import path
from . import views

urlpatterns = [
    path('users/login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('', views.get_routes, name='routes'),
    path('users/profile/', views.get_user_profiles, name='users-profile'),
    path('products/', views.get_products, name='products'),
    path('products/<str:pk>/', views.get_product, name='product'),
]
