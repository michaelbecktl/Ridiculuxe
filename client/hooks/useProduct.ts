import {
  MutationFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query'
import * as API from '../apis/product'

export function useProduct(name: string) {
  const query = useQuery({
    queryKey: ['product'],
    queryFn: () => API.getProductByName(name),
  })
  return {
    ...query,
    soldProduct: useSoldProduct(),
  }
}

export function useProductMutation<TData = unknown, TVariables = unknown>(
  mutationFn: MutationFunction<TData, TVariables>,
) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['product'] })
    },
  })
}

export async function useSoldProduct() {
  return useProductMutation(API.soldProduct)
}
