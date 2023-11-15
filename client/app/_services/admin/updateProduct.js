import { getBrowserClient } from "../supabase/getBrowserClient";

export default async function updateProduct({ id, name, category, description }) {
  const TABLE_NAME = 'products'
  const supabase = getBrowserClient()
  const { data, error } = await supabase
    .from(TABLE_NAME)
    .update({ name: name, category: category, description: description })
    .eq('id', id)
    .select()

  return { data, error }
}