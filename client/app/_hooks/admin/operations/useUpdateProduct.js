import React, { useState } from 'react'

// App imports
import { getBrowserClient } from '@services/supabase/getBrowserClient'

export default function useUpdateProduct() {
  const supabase = getBrowserClient()
  const [isLoading, setIsLoading] = useState(false)

  async function updateProduct(props) {
    const { id, name, category, description, thumbnail } = props

    setIsLoading(true)

    const { data, error } = await supabase
      .from('products')
      .update({ name: name, category: category, description: description })
      .eq('id', id)
      .select() 

    setIsLoading(false)

    return { data, error }
  }

  return { updateProduct, isLoading }
}
