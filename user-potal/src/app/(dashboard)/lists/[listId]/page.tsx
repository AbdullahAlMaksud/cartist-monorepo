import { ShoppingListDetailScreen } from "@/features/shopping-list";

interface ListDetailPageProps {
  params: Promise<{ listId: string }>;
}

const ListDetailPage = async ({ params }: ListDetailPageProps) => {
  const { listId } = await params;

  return <ShoppingListDetailScreen listId={listId} />;
};

export default ListDetailPage;
