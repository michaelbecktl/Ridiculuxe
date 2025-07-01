import {
  MutationFunction,
  useMutation,
  useQueries,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import * as API from '../apis/cart'
import { useNavigate } from 'react-router-dom'
import { Cart, CartData } from '../../models/ridiculuxe'
import { getProductById } from '../apis/product'
import { useUser } from './useUser'

export function useCart() {
  // Hook to get all items in shopping cart given current user's ID as an argument
  const user = useUser()
  const id = user.data?.id.toString()

  const query = useQuery({
    queryKey: ['cart'],
    queryFn: () => {
      if (id) return API.getCartByUser(id)
    },
    enabled: !!id,
  })

  return {
    ...query,
    user: user.data,
    addToCart: useAddToCart(), // Add a specific product to user's shopping cart, given argument { userId, productId, quantity }
    updateCart: useUpdateCart(), // To update ALL quantities of product currently in shopping card, given argument { userId, cart: [{ userId, productId, quantity }] }
    removeFromCart: useDeleteFromCart(), // To delete one specific product completely from user's shopping cart, given argument { userId, productId }
    destroy: useDeleteCart(), // To completely remove all items in a cart given { userId }
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

export function useDeleteCart() {
  return useCartMutations(API.deleteCart)
}

export function useUpdateCart() {
  return useCartMutations(API.updateCart)
}

export function useCartProducts() {
  const cart = useCart()

  const productIds = cart.data?.map((item: Cart) => item.productId) ?? []

  const products = useQueries({
    queries: productIds.map((id: string) => ({
      queryKey: ['cartproduct', id],
      queryFn: () => getProductById(id),
      enabled: !!cart,
    })),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
        success: results.every((result) => result.isSuccess),
      }
    },
  })

  return { cart, products: products }
}
