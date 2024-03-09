import * as fs from "fs";
import { EStatus } from "wms-models/lib/shared";
import { uuid } from "wms-utils/lib/uuid";

export async function generateOutbound(): Promise<void> {
  const obj: any = {
    result: [],
  };

  for (let index: number = 301; index <= 10000; index++) {
    const status: EStatus = EStatus.COMPLETED;
    const _id: string = uuid();
    let no: string = index.toString().padStart(6, "0");
    const outbound = {
      _id,
      active: true,
      deletedAt: null,
      arrivalTime: {
        $date: "2024-03-09T12:01:59.929Z",
      },
      no: `OR${no}`,
      items: [
        {
          no: "I0002",
          sku: "IPHONE8",
          name: "Iphone 8",
          uom: "BUCKET",
          type: "AGRICULTURE",
          grossWeight: 20,
          itemCount: 10,
        },
      ],
      totalGrossWeight: 400,
      totalValue: 0,
      status,
      createdAt: {
        $date: "2024-03-09T12:01:59.933Z",
      },
      updatedAt: {
        $date: "2024-03-09T12:01:59.933Z",
      },
      __v: 0,
    };

    obj.result.push(outbound);
  }
  const json: string = JSON.stringify(obj);
  fs.appendFileSync(
    `/Users/phamvulongkhai/Nestjs/TDTU-DA2/outbound.json`,
    JSON.stringify(obj)
  );
}
