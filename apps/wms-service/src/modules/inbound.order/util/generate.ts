import * as fs from "fs";
import { EStatus } from "wms-models/lib/shared";
import { uuid } from "wms-utils/lib/uuid";

export async function generateInbound(): Promise<void> {
  const obj: any = {
    result: [],
  };

  for (let index: number = 5001; index <= 10000; index++) {
    const status: EStatus = EStatus.COMPLETED;
    const _id: string = uuid();
    let no: string = index.toString().padStart(6, "0");
    const inbound = {
      _id,
      active: true,
      deletedAt: null,
      arrivalTime: {
        $date: "2024-03-09T12:01:59.929Z",
      },
      no: `IR${no}`,
      items: [
        {
          no: "I0002",
          sku: "IPHONE8",
          name: "Iphone 8",
          uom: "BUCKET",
          type: "AGRICULTURE",
          grossWeight: 20,
          itemCount: 15,
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

    obj.result.push(inbound);
  }
  const json: string = JSON.stringify(obj);
  fs.appendFileSync(
    `/Users/phamvulongkhai/Nestjs/TDTU-DA2/inbound.json`,
    JSON.stringify(obj)
  );
}
