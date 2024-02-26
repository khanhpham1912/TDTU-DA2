import { forwardRef, useImperativeHandle } from "react";

export const EditTableAction = forwardRef(function EditTableAction(
  {
    add,
    remove,
  }: {
    add: (defaultValue?: any, insertIndex?: number) => void;
    remove: (index: number | number[]) => void;
  },
  ref: any
) {
  useImperativeHandle(
    ref,
    () => {
      return {
        onAdd(value: any, insertIndex?: number) {
          add(value, insertIndex);
        },
        onRemove(index: number | number[]) {
          remove(index);
        },
      };
    },
    [add, remove]
  );

  return <div style={{ display: "none" }} />;
});
