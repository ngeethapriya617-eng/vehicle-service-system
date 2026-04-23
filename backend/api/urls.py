from django.urls import path
from .views import get_components, monthly_revenue, vehicles, payments, revenue, issues, yearly_revenue

urlpatterns = [
    path('components/', get_components),
    path('vehicles/', vehicles),
    path('payments/', payments),
    path('revenue/', revenue),
    path('issues/', issues),
    path('revenue/monthly/', monthly_revenue),
    path('revenue/yearly/', yearly_revenue),
]