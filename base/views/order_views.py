from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer
from datetime import datetime


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_order_items(request):
    user = request.user
    data = request.data
    # That post data
    order_items = data['orderItems']
    # Orderitems that sent with data or post request. we send it from front end
    if order_items and len(order_items) == 0:
        return Response({'detail': "No Order Items"}, status=status.HTTP_400_BAD_REQUEST)
    else:
        # 1_Create Order
        order = Order.objects.create(
            user=user,
            payment_Method=data['paymentMethod'],
            tax_Price=data['taxPrice'],
            shipping_Price=data['shippingPrice'],
            total_Price=data['totalPrice']
        )

        # 2_Create shipping address
        shipping = ShippingAddress.objects.create(
            order=order,
            # the order that we just created in #1
            address=data['shippingAddress']['address'],
            city=data['shippingAddress']['city'],
            postal_Code=data['shippingAddress']['postalCode'],
            country=data['shippingAddress']['country'],
            # We made shipping price in #1
        )
        # 3_Create order items and set order to orderItem relationship
        # we are going to loop through each order item: orderitems = data['orderItems']
        for order_item in order_items:
            # first we need to get the product by its ID
            product = Product.objects.get(_id=order_item['idProduct'])
            item = OrderItem.objects.create(
                product=product,
                order=order,
                name=product.name,
                qty=order_item['qty'],
                price=order_item['price'],
                image=product.image.url,
            )
            # 4_Update stack
            product.count_In_Stock -= item.qty
            product.save()

    serializer = OrderSerializer(order, many=False)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_orders(request):
    user = request.user
    orders = user.order_set.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_orders(request):
    orders = Order.objects.all()
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAdminUser])
def get_order_by_id(request, pk):
    user = request.user

    try:
        order = Order.objects.get(_id=pk)
        if user.is_staff or order.user == user:
            serializer = OrderSerializer(order, many=False)
            return Response(serializer.data)
        else:
            Response({'detail': 'Not authorize to view this order'}, status=status.HTTP_400_BAD_REQUEST)
    except:
        return Response({'detail': 'Order does not exist'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_order_to_paid(request, pk):
    order = Order.objects.get(_id=pk)

    order.is_Paid = True
    order.paid_At = datetime.now()
    order.save()
    return Response('Order was paid')
