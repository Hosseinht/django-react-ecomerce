from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status

from django.contrib.auth.models import User

from base.serializers import UserSerializer, UserSerializerWithToken

# Customize token for sending more information
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        serializer = UserSerializerWithToken(self.user).data
        for k, v in serializer.items():
            data[k] = v
            # or:
            # data['username'] = self.user.username
            # data['email'] = self.user.email

        return data
    # no need to decode the token. we get the user information in the initial response


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    # Generate token with more user information


@api_view(['POST'])
def register_user(request):
    # data is from post request
    data = request.data
    # handeling error
    try:
        user = User.objects.create(
            first_name=data['name'],
            username=data['email'],
            email=data['email'],
            password=make_password(data['password'])
            # make_password hash the password
        )
        serializer = UserSerializerWithToken(user, many=False)
        # many=False! because we want to create one user not multiple
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email is already exists'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_user_profile(request):
    user = request.user
    serializer = UserSerializerWithToken(user, many=False)
    # It's not logged in user. It gets data from the token because of the decorator
    data = request.data
    # Once we get the user information we want to update this user.
    # so we need to pull out the data so we can update our user
    user.first_name = data['name']
    user.username = data['email']
    user.email = data['email']
    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_profile(request):
    user = request.user
    # It's not logged in user. It gets data from the token because of the decorator

    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_users(request):
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    return Response(serializer.data)
