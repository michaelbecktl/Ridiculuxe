import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useUser } from './useUser'
import * as API from '../apis/order'
import { OrderProduct } from '../../models/ridiculuxe'

export function useOrder() {
  // Hook to get all items in shopping cart given current user's ID as an argument
  const user = useUser()
  const id = user.data?.id.toString()

  const query = useQuery({
    queryKey: ['order'],
    queryFn: () => {
      if (id) return API.getOrder(id)
    },
    enabled: !!id,
  })

  return {
    ...query,
    addOrder: useAddOrder(),
  }
}

export function useOrderMutations<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['order'] }),
  })
}

export function useAddOrder() {
  return useOrderMutations(API.createOrder)
}

export function useOrderProducts(order: OrderProduct) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: () => API.createOrderProduct(order),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['orderProduct'] }),
  })
}
