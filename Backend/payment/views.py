import stripe
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Order, Payment

stripe.api_key = settings.STRIPE_SECRET_KEY

@csrf_exempt
def create_checkout_session(request):
    if request.method == "POST":
        order_id = request.POST.get("order_id")
        
        if not order_id:
            return JsonResponse({"error": "Order ID is required"}, status=400)

        try:
            order = Order.objects.get(id=order_id)
        except Order.DoesNotExist:
            return JsonResponse({"error": "Order not found"}, status=404)

        # 🔥 Calculate total price from items
        total = sum(item.quantity * item.price for item in order.items.all())

        # Create Stripe checkout session
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{
                "price_data": {
                    "currency": "usd",
                    "product_data": {"name": "Shawarma Order"},
                    "unit_amount": int(total * 100),  # Convert to cents
                },
                "quantity": 1,
            }],
            mode="payment",
            success_url="http://localhost:3000/payment-success",
            cancel_url="http://localhost:3000/payment-cancel",
        )

        # Create a payment entry in your database
        payment = Payment.objects.create(
            user=order.user,
            order=order,
            amount=total,
            stripe_payment_id=session.id,
            status="pending"
        )

        return JsonResponse({"id": session.id})
    
    return JsonResponse({"error": "Invalid request method"}, status=400)
