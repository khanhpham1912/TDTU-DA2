import * as FileSaver from 'file-saver';
import * as Papa from 'papaparse';

export class ExportUtil {
  public static toCsv(data: any, header: string[], fileName: string) {
    const csv = Papa.unparse({
      fields: header,
      data: data,
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    FileSaver.saveAs(blob, `${fileName}.csv`);
  }
}
