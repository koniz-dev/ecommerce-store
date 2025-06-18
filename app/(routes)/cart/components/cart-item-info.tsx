import { Minus, Plus } from 'lucide-react';
import useCart from '@/hooks/use-cart';
import { CartItem } from '@/types';

interface CartItemProps {
  item: CartItem;
}

const CartItemInfo: React.FC<CartItemProps> = ({ item }: CartItemProps) => {
  const { addItem, decreaseItemQuantity } = useCart();

  return (
    <div className="space-y-1">
      <p className="text-lg font-semibold text-black">{item.name}</p>

      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span>Size: {item.size.label}</span>
        <span className="flex items-center gap-1">
          Color:
          <span
            className="w-4 h-4 rounded-full border border-gray-300"
            style={{ backgroundColor: item.color.value }}
          />
        </span>
      </div>

      <div className="flex items-center gap-3 mt-1">
        <button
          onClick={() => decreaseItemQuantity(item.variantId)}
          className="p-1 border rounded"
        >
          <Minus size={14} />
        </button>

        <span className="text-sm text-gray-800">Qty: {item.quantity}</span>

        <button
          onClick={() =>
            addItem({
              ...item,
              quantity: 1,
            })
          }
          className="p-1 border rounded"
        >
          <Plus size={14} />
        </button>
      </div>

      <p className="text-sm font-medium text-gray-900">
        {(item.price * item.quantity).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
      </p>
    </div>
  );
};

export default CartItemInfo;
