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
  const query = useQuery({
    queryKey: ['cart'],
    queryFn: () => API.getCartByUser(id),
  })

  return {
    ...query,
    addToCart: useAddToCart(),
    updateCart: useUpdateCart(),
    deleteFromCart: useDeleteFromCart(),
    buyNow: useBuyNow(),
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
