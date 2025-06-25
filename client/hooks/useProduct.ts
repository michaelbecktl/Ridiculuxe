import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import * as API from '../apis/product'

export async function useProduct(id: number) {
  const query = useQuery({
    queryKey: ['product'],
    queryFn: () => API.getProductById(id),
  })
  return {
    ...query,
    sold: useSoldProduct(),
  }
}

export function useProductMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] })
    },
  })
  return mutation
}

export async function useSoldProduct() {
  return useProductMutation(API.soldProduct)
}
