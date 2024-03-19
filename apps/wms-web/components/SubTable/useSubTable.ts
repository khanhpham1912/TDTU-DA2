import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getInventory, getInventoryAvailable } from "@/services/items.service";

export const useSubTable = ({
  expanded,
  record,
}: {
  expanded: boolean;
  record: any;
}) => {
  const [data, setData] = useState<any>();
  useQuery({
    queryKey: ["item-inventories", record?.no],
    queryFn: () => getInventory(record?.no),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    enabled: expanded,
    retry: false,
    onSuccess: (response) => {
      const _data = {
        ...record,
        ...data,
        inventories: response?.data?.inventories,
      };
      setData(_data);
    },
  });
  useQuery({
    queryKey: ["item-inventories-available", record?.no],
    queryFn: () => getInventoryAvailable(record?.no),
    keepPreviousData: true,
    refetchOnWindowFocus: false,
    enabled: expanded,
    retry: false,
    onSuccess: (response) => {
      const _data = {
        ...record,
        ...data,
        availableInventories: response?.data?.availableInventories,
      };
      setData(_data);
    },
  });

  return { data };
};
