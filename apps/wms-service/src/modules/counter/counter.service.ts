import { Injectable } from "@nestjs/common";
import * as numeral from "numeral";
import { DateTime } from "luxon";
import { CounterWriteRepository } from "./repository";
import { Counter } from "wms-models/lib/counter";

@Injectable()
export class CounterService {
  constructor(private counterWriteRepo: CounterWriteRepository) {}

  public async getNextSequence(name: string, prefix: string, format: string) {
    const counter = await this.getNextCount(name);
    const suffix = format ? numeral(counter).format(format) : counter;

    const str = `${prefix}${suffix}`;

    return str;
  }

  public async getNextCount(name: string) {
    const counter: Counter = await this.counterWriteRepo.inscrCounter(
      name,
      null
    );

    return counter.currentCounter;
  }

  public async getNextSequenceWithCurrentDate(
    name: string,
    prefix: string,
    format: string
  ) {
    const currentDateTime = DateTime.now().startOf("day");
    const current = currentDateTime.toFormat("ddLLLyy").toUpperCase();

    const counter: Counter = await this.counterWriteRepo.inscrCounter(
      name,
      current
    );
    const suffix = format
      ? numeral(counter.currentCounter).format(format)
      : counter.currentCounter;

    const str = `${prefix}-${current}-${suffix}`;

    if (counter.currentCounter === 1) {
      await this.counterWriteRepo.deleteCounter(name, current);
    }

    return str;
  }
}
