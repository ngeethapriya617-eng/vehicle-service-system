from django.db import models

# Create your models here.
from django.db import models

class Component(models.Model):
    name = models.CharField(max_length=100)
    component_type = models.CharField(max_length=100)
    purchase_price = models.DecimalField(max_digits=10, decimal_places=2)
    repair_price = models.DecimalField(max_digits=10, decimal_places=2)
    stock = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Vehicle(models.Model):
    owner_name = models.CharField(max_length=100)
    vehicle_number = models.CharField(max_length=50)
    brand = models.CharField(max_length=100)
    model = models.CharField(max_length=100)
    issue_description = models.TextField()
    status = models.CharField(max_length=50, default="Pending")
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.vehicle_number
    
class Payment(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    paid_status = models.CharField(max_length=20, default="Paid")
    paid_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.vehicle.vehicle_number)
    
class Issue(models.Model):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE)
    component = models.ForeignKey(Component, on_delete=models.CASCADE)
    issue_name = models.CharField(max_length=100)
    solution_type = models.CharField(max_length=20)   # Repair / Replace
    final_price = models.DecimalField(max_digits=10, decimal_places=2)

    def __str__(self):
        return self.issue_name