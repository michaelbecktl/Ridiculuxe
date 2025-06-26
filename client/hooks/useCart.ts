import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import * as API from '../apis/cart'
import { useNavigate } from 'react-router-dom'
import { CartData } from '../../models/ridiculuxe'

export function useCart(id: string) {
  // Hook to get all items in shopping cart given current user's ID as an argument
  const query = useQuery({
    queryKey: ['cart'],
    queryFn: () => API.getCartByUser(id),
  })

  return {
    ...query,
    addToCart: useAddToCart(), // Add a specific product to user's shopping cart, given argument { userId, productId, quantity }
    updateCart: useUpdateCart(), // To update ALL quantities of product currently in shopping card, given argument { userId, cart: [{ userId, productId, quantity }] }
    deleteFromCart: useDeleteFromCart(), // To delete one specific product completely from user's shopping cart, given argument { userId, productId }
    buyNow: useBuyNow(), // Same as addToCart mutation, but navigates user immediately to the shopping cart checkout page
  }
}

export function useCartMutations<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['cart'] }),
  })
}

export function useAddToCart() {
  return useCartMutations(API.addToCart)
}

export function useBuyNow() {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: (addProduct: CartData) => API.addToCart(addProduct),
    onSuccess: () => {
      ;(queryClient.invalidateQueries({ queryKey: ['cart'] }),
        navigate('/checkout'))
    },
  })
}

export function useDeleteFromCart() {
  return useCartMutations(API.deleteFromCart)
}

export function useUpdateCart() {
  return useCartMutations(API.updateCart)
}
