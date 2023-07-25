from rest_framework import serializers

from .models import Article, Comment, Post, Tag, Thread, User


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name', 'email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        print(type(instance))
        return instance


class CommentSerializer(serializers.ModelSerializer):
    author_info = serializers.SerializerMethodField()

    def get_author_info(self, obj):
        return f'{obj.author.first_name} {obj.author.last_name}'

    class Meta:
        model = Comment
        fields = ['id', 'body', 'author_info', 'author', 'article', 'parent',
                  'created_at', 'updated_at', 'likes']


class TagSerializer(serializers.ModelSerializer):

    class Meta:
        model = Tag
        fields = '__all__'


class ArticleSerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True)

    class Meta:
        model = Article
        fields = '__all__'


class ThreadSerializer(serializers.ModelSerializer):
    author_info = serializers.SerializerMethodField()
    likes = serializers.SerializerMethodField()
    dislikes = serializers.SerializerMethodField()
    posts_count = serializers.SerializerMethodField()

    def get_posts_count(self, obj):
        return obj.related_posts.count()

    def get_author_info(self, obj):
        return f'{obj.author.first_name} {obj.author.last_name}'
    
    def get_likes(self, obj):
        return obj.likes.count()

    def get_dislikes(self, obj):
        return obj.dislikes.count()

    class Meta:
        model = Thread
        fields = ['id', 'content', 'content_to_display', 'title', 'author', 'author_info', 'created_at', 'likes', 'dislikes', 'posts_count']


class PostSerializer(serializers.ModelSerializer):
    author_info = serializers.SerializerMethodField()

    def get_author_info(self, obj):
        return f'{obj.author.first_name} {obj.author.last_name}'

    class Meta:
        model = Post
        fields = ['id', 'thread','content', 'content_to_display', 'author', 'author_info', 'created_at']
