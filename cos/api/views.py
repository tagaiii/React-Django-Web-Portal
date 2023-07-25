import datetime

from django.shortcuts import get_object_or_404
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters, generics, status
from rest_framework.authentication import get_authorization_header
from rest_framework.decorators import api_view
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.response import Response
from rest_framework.views import APIView

from .filters import ArticleFilter, PostFilter, ThreadFilter
from .models import Article, Comment, Post, Thread, User
from .serializers import (ArticleSerializer, CommentSerializer, PostSerializer,
                          ThreadSerializer, UserSerializer)
from .tokens import (create_access_token, create_refresh_token,
                     decode_access_token, decode_refresh_token)


@api_view(['GET'])
def get_routes(request):

    routes = [
        {
            'Endpoint': '/articles/',
            'method': 'GET',
            'body': None,
            'description': 'Returns an array of notes'
        },
        {
            'Endpoint': '/articles/id',
            'method': 'GET',
            'body': None,
            'description': 'Returns a single note object'
        },
        {
            'Endpoint': '/login/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Logs in with given credentials'
        },
        {
            'Endpoint': '/register/',
            'method': 'POST',
            'body': {'body': ""},
            'description': 'Registers new user with given data'
        },
        {
            'Endpoint': '/user/',
            'method': 'GET',
            'body': None,
            'description': 'Returns a user data depending on authorization header'
        },
        {
            'Endpoint': '/logout/',
            'method': 'POST',
            'body': None,
            'description': 'Logs out current active user'
        },
        {
            'Endpoint': '/token/refresh',
            'method': 'GET',
            'body': None,
            'description': 'Refreshes access token if there is a valid refresh token in cookies'
        },
    ]

    return Response(routes)


class ArticleList(generics.ListAPIView):
    queryset = Article.objects.order_by('-created_at')
    serializer_class = ArticleSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = ArticleFilter
    search_fields = ['header', 'body']


class ArticleDetail(generics.RetrieveAPIView):

    queryset = Article.objects.all()
    serializer_class = ArticleSerializer


class LikeArticleView(APIView):
    def post(self, request, pk):
        article = get_object_or_404(Article, id=pk)
        auth = get_authorization_header(request).split()
        if auth and len(auth) == 2:

            token = auth[1].decode('utf-8')
            id = decode_access_token(token)
            user = User.objects.filter(pk=id).first()

        if user in article.likes.all():
            article.likes.remove(user.id)
            message = 'Disliked'
        else:
            article.likes.add(user.id)
            message = 'Liked'
        data = {
            "message": message,
            "likes_count": article.likes.count()
        }

        return Response(data)


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        user = User.objects.filter(email=request.data['email']).first()
        print(request.user)

        if not user:
            raise AuthenticationFailed('Invalid credentials!')

        if not user.check_password(request.data['password']):
            raise AuthenticationFailed('Invalid credentials!')

        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        response = Response()
        expires = datetime.datetime.utcnow() + datetime.timedelta(days=7)
        response.set_cookie(
            key='refreshToken', value=refresh_token, httponly=True, expires=expires
        )
        response.data = {
            'token': access_token,
            'user': UserSerializer(user).data
        }
        return response


class UserView(APIView):
    def get(self, request):
        auth = get_authorization_header(request).split()
        if auth and len(auth) == 2:

            token = auth[1].decode('utf-8')
            id = decode_access_token(token)
            user = User.objects.filter(pk=id).first()

            return Response({
                'user': UserSerializer(user).data
            })

        raise AuthenticationFailed('Unauthenticated!')


class LogoutView(APIView):
    def post(self, request):
        response = Response()
        response.delete_cookie('refreshToken')
        response.data = {
            'message': 'logged out'
        }
        return response


class RefreshTokenView(APIView):
    def post(self, request):
        refresh_token = request.COOKIES.get('refreshToken')
        id = decode_refresh_token(refresh_token)
        access_token = create_access_token(id)
        return Response({
            'token': access_token
        })


class CommentView(generics.ListAPIView):
    queryset = Comment.objects.all().order_by('-created_at')
    serializer_class = CommentSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['article', 'parent']


class AddCommentView(generics.CreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class DeleteCommentView(generics.DestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_field = "pk"


class LikeCommentView(APIView):
    def post(self, request, pk):
        comment = get_object_or_404(Comment, id=pk)
        auth = get_authorization_header(request).split()
        if auth and len(auth) == 2:

            token = auth[1].decode('utf-8')
            id = decode_access_token(token)
            user = User.objects.filter(pk=id).first()

        if user in comment.likes.all():
            comment.likes.remove(user.id)
            message = 'Disliked'
        else:
            comment.likes.add(user.id)
            message = 'Liked'
        data = {
            "message": message,
            "likes_count": comment.likes.count()
        }

        return Response(data)


class ThreadListView(generics.ListAPIView):
    queryset = Thread.objects.all().order_by("-created_at")
    serializer_class = ThreadSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter]
    filterset_class = ThreadFilter
    search_fields = ["title"]


class ThreadDetailView(generics.RetrieveAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer


class CreateThreadView(generics.CreateAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer


class DeleteThreadView(generics.DestroyAPIView):
    queryset = Thread.objects.all()
    serializer_class = ThreadSerializer
    lookup_field = "pk"


class PostListView(generics.ListAPIView):
    queryset = Post.objects.all().order_by("-created_at")
    serializer_class = PostSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = PostFilter


class CreatePostView(generics.CreateAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer


class DeletePostView(generics.DestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    lookup_field = 'pk'
