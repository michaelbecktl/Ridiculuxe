import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import * as API from '../apis/cart'

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

export function useDeleteFromCart() {
  return useCartMutations(API.deleteFromCart)
}

export function useUpdateCart() {
  return useCartMutations(API.updateCart)
}
