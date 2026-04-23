from django.contrib import admin

# Register your models here.
from .models import Component
from .models import Vehicle
from .models import Payment
from .models import Issue
admin.site.register(Component)
admin.site.register(Vehicle)
admin.site.register(Payment)
admin.site.register(Issue)

