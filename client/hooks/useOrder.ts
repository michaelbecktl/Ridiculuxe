import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import { useUser } from './useUser'
import { OrderProduct } from '../../models/ridiculuxe'
import { createOrderProduct } from '../apis/order'
import { createOrder, getOrder } from '../apis/checkout'

export function useOrder() {
  const user = useUser()
  const id = user.data?.id.toString()

  const query = useQuery({
    queryKey: ['order'],
    queryFn: () => {
      if (id) return getOrder(id)
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['order'] })
      console.log(data)
      return data
    },
  })
}

export function useAddOrder() {
  return useOrderMutations(createOrder)
}

export function useOrderProducts() {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (order: OrderProduct) => createOrderProduct(order),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['orderProduct'] }),
  })
}
