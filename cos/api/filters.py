import django_filters

from .models import Article, Tag, Thread, Post


class ArticleFilter(django_filters.FilterSet):
    recommended = django_filters.BooleanFilter()
    for_main_page = django_filters.BooleanFilter()
    tags__title = django_filters.ModelMultipleChoiceFilter(queryset=Tag.objects.all(), field_name='tags__title', to_field_name='title', lookup_expr='iexact')
    created_at = django_filters.DateTimeFromToRangeFilter(field_name='created_at')

    class Meta:
        model = Article
        fields = ['recommended', 'for_main_page', 'tags__title', 'created_at']


class ThreadFilter(django_filters.FilterSet):

    class Meta:
        model = Thread
        fields = ['author', 'created_at']


class PostFilter(django_filters.FilterSet):

    class Meta:
        model = Post
        fields = ['author', 'created_at', 'thread']