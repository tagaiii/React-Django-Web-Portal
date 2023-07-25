from django.urls import path

from .views import *

urlpatterns = [
    path('', get_routes, name='routes'),
    path('register', RegisterView.as_view(), name='register'),
    path('login', LoginView.as_view(), name='login'),
    path('user', UserView.as_view(), name='user'),
    path('logout', LogoutView.as_view(), name='logout'),
    path('token/refresh', RefreshTokenView.as_view(), name='refresh-token'),
    path('articles/<str:pk>/like', LikeArticleView.as_view(), name='article-like'),
    path('articles/<str:pk>', ArticleDetail.as_view(), name='article-detail'),
    path('articles', ArticleList.as_view(), name='article-list'),
    path('comments/add', AddCommentView.as_view(), name='add-comment'),
    path('comments/<str:pk>/delete',
         DeleteCommentView.as_view(), name='delete-comment'),
    path('comments/<str:pk>/like', LikeCommentView.as_view(), name='like-comment'),
    path('comments', CommentView.as_view(), name='comment-list'),
    path('threads/create', CreateThreadView.as_view(), name="thread-create"),
    path('threads/<str:pk>/delete',
         DeleteThreadView.as_view(), name="thread-delete"),
    path('threads/<str:pk>', ThreadDetailView.as_view(), name="thread-detail"),
    path('threads', ThreadListView.as_view(), name="thread-list"),
    path('posts/create', CreatePostView.as_view(), name="post-create"),
    path('posts/<str:pk>/delete', DeletePostView.as_view(), name="post-delete"),
    path('posts', PostListView.as_view(), name="post-list"),
]
