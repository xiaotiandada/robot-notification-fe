declare namespace ApiType {
  type MessageItem = {
    data: {
      content: string,
      createdAt: Date,
    }[],
    meta: { itemCount: number; totalItems: number };
  }
 
}
