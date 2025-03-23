import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, clearCart } from "../redux/slices/CartSlice";

const cart = () => {
    const cart = useSelector((state) => state.cart.cart);
    const dispatch = useDispatch();

    return (
        <div className="p-4">
            <h1 className="text-xl font-bold mb-4">Your Cart</h1>
            {cart.length === 0 ? ( <p>Your Cart is empty</p> 
            ) : (
                cart.map((item) => (
                    <div key={item.id} className="border p-2 mb-2">
                        <h2>{item.name}</h2>
                        <p>{item.price}</p>
                        <button className="bg-red-500 text-white px-2 py-1 rounded" onClick={() => dispatch(removeFromCart(item.id))}>
                            Remove
                        </button>
                    </div>
                ))
            )}
            {cart.length > 0 && (
                <button className="bg-gray-700 text-white px-4 py-2 mt-4 rounded" onClick={() => dispatch(clearCart())}>
                    Clear Cart
                </button>
            )}
        </div>
    )
}