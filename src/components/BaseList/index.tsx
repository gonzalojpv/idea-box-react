// Example: A Generic List Component
// This reusable component can be used to render a list of items of any type. The type of the items is passed via a generic type parameter.

import { type ReactNode } from "react";

type ListProps<T> = {
  items: T[];
  renderItem: (item: T) => ReactNode;
};

export default function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}
