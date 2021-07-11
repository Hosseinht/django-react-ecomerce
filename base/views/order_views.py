from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework import status
from base.models import Product, Order, OrderItem, ShippingAddress
from base.serializers import ProductSerializer, OrderSerializer


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
