from django.contrib import admin

from .models import *


class ArticleAdmin(admin.ModelAdmin):
    readonly_fields = ('viewers', "likes")

class UserAdmin(admin.ModelAdmin):
    fields = ('email', 'first_name', 'last_name', 'is_superuser', 'is_staff', 'is_active', 'user_permissions', 'groups', 'date_joined', 'last_login')
    readonly_fields = ("user_permissions", "last_login", "date_joined")


admin.site.register(Article, ArticleAdmin)
admin.site.register(Tag)
admin.site.register(User, UserAdmin)
admin.site.register(Comment)
admin.site.register(Thread)
admin.site.register(Post)