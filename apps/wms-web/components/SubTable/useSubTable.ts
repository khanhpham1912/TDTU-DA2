import { useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getInventory } from "@/services/items.service";

export const useSubTable = ({
  expanded,
  record,
}: {
  expanded: boolean;
  record: any;
}) => {
  const [data, setData] = useState<any>();
  useQuery({
    queryKey: ["item-inventories", record?._id,],
    queryFn: () => getInventory(record?._id),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    enabled: expanded,
    retry: false,
    onSuccess: (response) => {
      const _data = { ...record, inventories: response?.data?.inventories };
      setData(_data);
    },
  });

  return { data };
};
