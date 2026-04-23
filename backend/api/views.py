from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import (
    Component,
    Vehicle,
    Payment,
    Issue
)

from django.db.models import Sum
from django.db.models.functions import (
    TruncDate,
    TruncMonth,
    TruncYear
)


@api_view(['GET', 'POST'])
def get_components(request):

    if request.method == 'GET':
        data = list(
            Component.objects.values()
        )
        return Response(data)

    if request.method == 'POST':
        Component.objects.create(
            name=request.data['name'],
            component_type=request.data[
                'component_type'
            ],
            purchase_price=request.data[
                'purchase_price'
            ],
            repair_price=request.data[
                'repair_price'
            ],
            stock=request.data['stock']
        )

        return Response({
            "message":
            "Component Added"
        })


@api_view(['GET', 'POST', 'PUT'])
def vehicles(request):

    if request.method == 'GET':
        data = list(
            Vehicle.objects.values()
        )
        return Response(data)

    if request.method == 'POST':
        Vehicle.objects.create(
            owner_name=request.data[
                'owner_name'
            ],
            vehicle_number=request.data[
                'vehicle_number'
            ],
            brand=request.data['brand'],
            model=request.data['model'],
            issue_description=request.data[
                'issue_description'
            ]
        )

        return Response({
            "message":
            "Vehicle Added"
        })

    if request.method == 'PUT':
        vehicle = Vehicle.objects.get(
            id=request.data['id']
        )

        vehicle.status = request.data[
            'status'
        ]

        vehicle.save()

        return Response({
            "message":
            "Status Updated"
        })


@api_view(['GET', 'POST'])
def payments(request):

    if request.method == 'GET':
        data = list(
            Payment.objects.values()
        )
        return Response(data)

    if request.method == 'POST':
        Payment.objects.create(
            vehicle_id=request.data[
                'vehicle'
            ],
            amount=request.data[
                'amount'
            ]
        )

        return Response({
            "message":
            "Payment Success"
        })


@api_view(['GET'])
def revenue(request):

    data = (
        Payment.objects
        .annotate(
            day=TruncDate('paid_at')
        )
        .values('day')
        .annotate(
            total=Sum('amount')
        )
        .order_by('day')
    )

    return Response(list(data))


@api_view(['GET', 'POST'])
def issues(request):

    if request.method == 'GET':
        data = list(
            Issue.objects.values()
        )
        return Response(data)

    if request.method == 'POST':

        if not request.data.get(
            'vehicle'
        ):
            return Response(
                {
                    "error":
                    "Vehicle required"
                },
                status=400
            )

        if not request.data.get(
            'component'
        ):
            return Response(
                {
                    "error":
                    "Component required"
                },
                status=400
            )

        component = Component.objects.get(
            id=request.data[
                'component'
            ]
        )

        if request.data[
            'solution_type'
        ] == "Repair":
            base_price = (
                component.repair_price
            )
        else:
            base_price = (
                component.purchase_price
            )

        labor = float(
            request.data.get(
                'labor_charge'
            ) or 0
        )

        misc = float(
            request.data.get(
                'misc_charge'
            ) or 0
        )

        total = (
            float(base_price)
            + labor
            + misc
        )

        Issue.objects.create(
            vehicle_id=request.data[
                'vehicle'
            ],
            component_id=request.data[
                'component'
            ],
            issue_name=request.data[
                'issue_name'
            ],
            solution_type=request.data[
                'solution_type'
            ],
            final_price=total
        )

        return Response({
            "message":
            "Issue Added",
            "price": total
        })


@api_view(['GET'])
def monthly_revenue(request):

    data = (
        Payment.objects
        .annotate(
            month=TruncMonth(
                'paid_at'
            )
        )
        .values('month')
        .annotate(
            total=Sum('amount')
        )
        .order_by('month')
    )

    return Response(list(data))


@api_view(['GET'])
def yearly_revenue(request):

    data = (
        Payment.objects
        .annotate(
            year=TruncYear(
                'paid_at'
            )
        )
        .values('year')
        .annotate(
            total=Sum('amount')
        )
        .order_by('year')
    )

    return Response(list(data))