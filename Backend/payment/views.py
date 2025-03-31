import stripe
from django.conf import settings
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Order, Payment

stripe.api_key = settings.STRIPE_SECRET_KEY

# Create your views here.
@csrf_exempt
def create_checkout_session(request):
    if request.method == "POST":
        order_id = request.POST.get("order_id")
        order = Order.objects.get(id=order_id)

        session = stripe.checkout.Session.create(
            payment_method_type=["card"],
            line_items = [{
                "price_data":{
                    "currency": "usd",
                    "product_data": {"data": "Shawarma Order"},
                    "unit_amount": int(order.total_price * 100),  #Convert to Cents
                },
                "quantity": 1,
            }],
            mode = "payment",
            success_url = "http://localhost:3000/payment-success",
            cancel_url =  "http://localhost:3000/payment-cancel",
        )

        payment = Payment.objects.create(
            user = order.user,
            order = order,
            amount = order.total_price,
            stripe_payment_id = session.id,
            status = 'pending'
        )

        return JsonResponse({"id": session.id})
    return JsonResponse({"error": "Invalid request"}, status=400)
