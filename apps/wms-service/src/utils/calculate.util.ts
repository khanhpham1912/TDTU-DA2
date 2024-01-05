import { BadRequestException } from 'src/exceptions/bad.request.exception';
import { ItemDocument } from 'src/modules/items/item.schema';
import { ResponseAvailableInventoryType } from 'src/types/response.available.inventory.type';
import { ResponseInventoryType } from 'src/types/response.inventory.type';
import { ItemQuantity } from './../common/item.quantity';

export function calculateInventory(
  inputs: ResponseInventoryType,
  id: string,
): number {
  const [a, b, c] = inputs.map((input) => {
    const results = input.flatMap((i) => {
      return i.items;
    });
    return calculateItemQuantity(results, id);
  });
  return a - b + c;
}

export function calculateListInventory(
  items: ItemDocument[],
  inputs: ResponseInventoryType,
) {
  return items.map((item) => {
    return calculateInventory(inputs, item.id);
  });
}

export function calculateAvailableInventory(
  inputs: ResponseAvailableInventoryType,
  id: string,
): number {
  const [a, b, c] = inputs.map((input) => {
    const results = input.flatMap((i) => {
      return i.items;
    });
    return calculateItemQuantity(results, id);
  });
  return a - b - c;
}

export function calculateListAvailableInventory(
  items: ItemDocument[],
  inputs: ResponseInventoryType,
) {
  return items.map((item) => {
    return calculateAvailableInventory(inputs, item.id);
  });
}

export function isListAvailableInventoryPositive(
  inputs: ResponseAvailableInventoryType,
  items: ItemQuantity[],
): void {
  items.map((item) => {
    const availableInventory: number = calculateAvailableInventory(
      inputs,
      item.id,
    );
    const itemQuantity: number = calculateItemQuantity(items, item.id);

    if (itemQuantity > availableInventory)
      throw new BadRequestException(
        `Available inventory of the ${item.id} is insufficient`,
      );
  });
}

function calculateItemQuantity(items: ItemQuantity[], id: string): number {
  return items.reduce((n, item) => {
    if (item.id === id) {
      return n + item.quantity;
    }
    return n;
  }, 0);
}
